import React from 'react'
import { slugify } from '@/lib/utils/slugify'

interface RendererProps {
    content: Record<string, any>
}

// Render inline marks (bold, italic, code, link, etc.)
function renderText(node: any, key: number) {
    if (node.type !== 'text') return null
    let el: React.ReactNode = node.text

    const marks: any[] = node.marks ?? []
    for (const mark of marks) {
        switch (mark.type) {
            case 'bold':
                el = <strong key={key}>{el}</strong>
                break
            case 'italic':
                el = <em key={key}>{el}</em>
                break
            case 'strike':
                el = <s key={key}>{el}</s>
                break
            case 'code':
                el = <code key={key} className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{el}</code>
                break
            case 'link':
                el = (
                    <a key={key} href={mark.attrs?.href} target="_blank" rel="noopener noreferrer"
                        className="text-orange-500 underline underline-offset-2 hover:text-orange-600">
                        {el}
                    </a>
                )
                break
        }
    }
    return <span key={key}>{el}</span>
}

// Render inline content array of a block
function renderInline(content: any[] = []) {
    return content.map((node, i) => {
        if (node.type === 'text') return renderText(node, i)
        if (node.type === 'hardBreak') return <br key={i} />
        return null
    })
}

// Render a single TipTap block node
function renderNode(node: any, index: number): React.ReactNode {
    if (!node?.type) return null

    switch (node.type) {
        case 'paragraph':
            return (
                <p key={index} className="leading-7 text-muted-foreground mb-4">
                    {renderInline(node.content)}
                </p>
            )

        case 'heading': {
            const level = node.attrs?.level ?? 2
            const text = (node.content ?? []).map((n: any) => n.text ?? '').join('')
            const id = slugify(text)
            const classes: Record<number, string> = {
                1: ' font-bold mt-10 mb-4 scroll-mt-24',
                2: ' font-semibold mt-8 mb-3 scroll-mt-24',
                3: ' font-semibold mt-6 mb-2 scroll-mt-24',
            }
            const Tag = `h${level}` as React.ElementType
            return (
                <Tag key={index} id={id} className={classes[level] ?? 'text-lg font-semibold mt-4 mb-2 scroll-mt-24'}>
                    {renderInline(node.content)}
                </Tag>
            )
        }

        case 'bulletList':
            return (
                <ul key={index} className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
                    {(node.content ?? []).map((item: any, i: number) => (
                        <li key={i}>{renderInline(item.content?.[0]?.content)}</li>
                    ))}
                </ul>
            )

        case 'orderedList':
            return (
                <ol key={index} className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground">
                    {(node.content ?? []).map((item: any, i: number) => (
                        <li key={i}>{renderInline(item.content?.[0]?.content)}</li>
                    ))}
                </ol>
            )

        case 'blockquote':
            return (
                <blockquote key={index} className="border-l-4 border-orange-500 pl-4 italic text-muted-foreground my-6">
                    {(node.content ?? []).map((n: any, i: number) => renderNode(n, i))}
                </blockquote>
            )

        case 'codeBlock':
            return (
                <pre key={index} className="bg-muted rounded-lg p-4 overflow-x-auto my-6">
                    <code className="text-sm font-mono">
                        {(node.content ?? []).map((n: any) => n.text ?? '').join('')}
                    </code>
                </pre>
            )

        case 'image':
            return (
                <figure key={index} className="my-6">
                    <img
                        src={node.attrs?.src}
                        alt={node.attrs?.alt ?? ''}
                        className="w-full rounded-xl object-cover"
                    />
                    {node.attrs?.title && (
                        <figcaption className="text-center text-sm text-muted-foreground mt-2">
                            {node.attrs.title}
                        </figcaption>
                    )}
                </figure>
            )

        case 'horizontalRule':
            return <hr key={index} className="my-8 border-border" />

        case 'hardBreak':
            return <br key={index} />

        // skip doc wrapper if ever passed directly
        case 'doc':
            return (node.content ?? []).map((n: any, i: number) => renderNode(n, i))

        default:
            return null // ✅ never crash on unknown types
    }
}

export default function TipTapRenderer({ content }: RendererProps) {
    if (!content?.content) return null

    return (
        <div className="prose-custom  max-w-none">
            {content.content.map((node: any, i: number) => renderNode(node, i))}
        </div>
    )
}