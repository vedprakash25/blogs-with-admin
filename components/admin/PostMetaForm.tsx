import React from "react";
import ImageUploader from "./ImageUploader";
import TagSelector from "./TagSelector";

type Category = {
  id: string;
  name: string;
};

type PostMetaFormProps = {
  coverImage: string | null;
  setCoverImage: (value: string | null) => void;

  categoryId: string;
  setCategoryId: (value: string) => void;
  categories: Category[];

  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
};

const PostMetaForm: React.FC<PostMetaFormProps> = ({
  coverImage,
  setCoverImage,
  categoryId,
  setCategoryId,
  categories,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <div className="space-y-4 max-w-2xs">
      {/* Cover Image */}
      <ImageUploader value={coverImage} onChange={setCoverImage} />

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategoryId(e.target.value)
          }
          className="w-full px-1 py-2 text-xs border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <TagSelector
        selectedIds={selectedTags}
        onChange={setSelectedTags}
      />
    </div>
  );
};

export default PostMetaForm;