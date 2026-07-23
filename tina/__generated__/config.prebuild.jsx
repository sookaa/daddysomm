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
        name: "drop",
        label: "Wine Drops",
        path: "content/drops",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Drop Title",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "theme",
            label: "Theme"
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date (appears in portal on/after this date)",
            required: true
          },
          {
            type: "datetime",
            name: "confirmationDeadline",
            label: "Confirmation Deadline (members can change until this)"
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description / Blurb"
          },
          {
            type: "object",
            name: "bottles",
            label: "Sample Bottles",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ?? "New Bottle"
              })
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "producer", label: "Producer" },
              { type: "string", name: "region", label: "Region" },
              { type: "string", name: "vintage", label: "Vintage" },
              {
                type: "string",
                name: "colour",
                label: "Colour",
                options: ["red", "white", "sparkling", "rose", "orange"]
              },
              {
                type: "boolean",
                name: "isInvestment",
                label: "Investment bottle"
              }
            ]
          }
        ]
      },
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
