const blogsArray = require("./testBlogs.json")

function escapeSQL(str = "") {
    return str.replace(/'/g, "''")
}

function parseContentToBlocks(content = "") {
    const lines = content.split("\n")
    const blocks = []

    let listBuffer = []

    const flushList = () => {
        if (listBuffer.length) {
            blocks.push({
                type: "list",
                items: listBuffer
            })
            listBuffer = []
        }
    }

    for (let line of lines) {
        const text = line.trim()

        if (!text) {
            flushList()
            continue
        }

        // Heading
        if (text.startsWith("## ")) {
            flushList()
            blocks.push({
                type: "heading",
                level: 2,
                text: text.replace("## ", "")
            })
            continue
        }

        if (text.startsWith("### ")) {
            flushList()
            blocks.push({
                type: "heading",
                level: 3,
                text: text.replace("### ", "")
            })
            continue
        }

        // List
        if (text.startsWith("- ")) {
            listBuffer.push(text.replace("- ", ""))
            continue
        }

        // Paragraph
        flushList()
        blocks.push({
            type: "paragraph",
            text
        })
    }

    flushList()

    return { blocks }
}

function generateSupabaseSQL(blogs) {

    const sqlValues = blogs.map((blog) => {

        const blocks = parseContentToBlocks(blog.content || blog.body || "")

        const contentJSON = JSON.stringify(blocks).replace(/'/g, "''")

        return `(
'${escapeSQL(blog.title)}',
'${blog.slug}',
'${escapeSQL(blog.description)}',
'${contentJSON}',
'https://xrrnvdkqsxdtcakzpjff.supabase.co/storage/v1/object/public/blog-images/blog-images',
NULL,
NULL,
'published',
'${blog.date}',
'${escapeSQL(blog.title)}',
'${escapeSQL(blog.description)}'
)`
    })

    return `
INSERT INTO blogs (
  title, slug, excerpt, content, cover_image,
  category_id, author_id,
  status, published_at,
  meta_title, meta_description
) VALUES
${sqlValues.join(",\n")};
`
}

const sql = generateSupabaseSQL(blogsArray.slice(0, 2))
console.log(sql)