import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: null,
  token: null,
  
  build: {
    outputFolder: "admin",
    publicFolder: "src",
  },
  
  media: {
    loadCustomStore: async () => {
      return class {
        async persist(files: any[]) {
          return files.map((file) => ({
            ...file,
            src: `/assets/${file.name}`,
          }));
        }
      };
    },
  },
  
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/posts",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              return values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'untitled';
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});