import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "9de2ce8a-902d-44e0-9af1-dcfbbe4e0fe7", // Get this from tina.io
  token: process.env.tina_cloud_token, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "./",
    basePath:     ".",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        ui: {
          filename: {
            readonly: false,
            slugify: values => {
              const date = new Date();
              const day = date.getDate().toString().padStart(2, '0');
              let month = date.getMonth() + 1;
              month = month .toString() .padStart(2, '0');
              const year = date.getFullYear();
              let currentDate = `${year}-${month}-${day}`;
              return `${currentDate}-${values?.title?.toLowerCase().replace(/ /g, '-')}`
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
          },
        ],
      },
    ],
  },
});
