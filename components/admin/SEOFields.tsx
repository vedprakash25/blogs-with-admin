'use client'

interface SEOFieldsProps {
  metaTitle: string
  metaDescription: string
  onMetaTitleChange: (val: string) => void
  onMetaDescriptionChange: (val: string) => void
}

export default function SEOFields({
  metaTitle,
  metaDescription,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: SEOFieldsProps) {
  return (
    <div className="border border-border rounded-xl p-5 space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <span>🔍</span> SEO Settings
      </h3>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Meta title
          <span className={`ml-2 text-xs font-normal ${metaTitle.length > 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
            {metaTitle.length}/60
          </span>
        </label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder="Leave blank to use blog title"
          maxLength={80}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Meta description
          <span className={`ml-2 text-xs font-normal ${metaDescription.length > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
            {metaDescription.length}/160
          </span>
        </label>
        <textarea
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder="Leave blank to use excerpt"
          maxLength={200}
          rows={3}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      {/* Preview */}
      {(metaTitle || metaDescription) && (
        <div className="border border-border rounded-lg p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Google preview</p>
          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium truncate">
            {metaTitle || 'Blog title will appear here'}
          </p>
          <p className="text-green-600 dark:text-green-400 text-xs mt-0.5">
            {process.env.NEXT_PUBLIC_SITE_URL}/blog/your-slug
          </p>
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
            {metaDescription || 'Blog excerpt will appear here as the meta description.'}
          </p>
        </div>
      )}
    </div>
  )
}
