// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "winedrop",
        label: "Wine Drops Page",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true
          },
          {
            type: "string",
            name: "intro",
            label: "Intro paragraph",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQs",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.question ?? "New FAQ"
              })
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea"
                },
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "closing",
            label: "Closing note",
            ui: {
              component: "textarea"
            }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
