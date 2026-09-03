import { notFound } from "next/navigation"

import { getComponentDoc } from "@/config/docs"
import { registryItemUrl } from "@/config/site"
import { docHref, slugify, type TocItem } from "@/lib/docs"
import { renderItemMarkdown } from "@/lib/markdown"
import { breadcrumbJsonLd, registryItemJsonLd } from "@/lib/seo"
import { consumerPath, getRegistryItem } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { CodeTabs, CodeTabsList, CodeTabsTrigger } from "@/components/code-tabs"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { H2, H3 } from "@/components/docs-heading"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { DocsPage } from "@/components/docs-page"
import { JsonLd } from "@/components/json-ld"
import { InstallCommand, NpmInstallCommand } from "@/components/install-command"
import { TabsContent } from "@/components/ui/tabs"

/** Docs page for one registry item, component or block. */
export async function DocsItemPage({ slug }: { slug: string }) {
  const doc = getComponentDoc(slug)
  const item = getRegistryItem(slug)
  if (!doc || !item) notFound()
  const markdown = (await renderItemMarkdown(slug)) ?? ""

  const isBlock = doc.kind === "block"
  const [first, ...rest] = doc.examples
  const toc: TocItem[] = [
    { title: "Installation", url: "#installation", depth: 2 },
    { title: "Usage", url: "#usage", depth: 2 },
    ...(rest.length
      ? [
          { title: "Examples", url: "#examples", depth: 2 },
          ...rest.map((example) => ({
            title: example.title ?? example.name,
            url: `#${slugify(example.title ?? example.name)}`,
            depth: 3,
          })),
        ]
      : []),
  ]
  const registryDeps = item.registryDependencies ?? []
  const npmDeps = item.dependencies ?? []
  const previewProps = isBlock
    ? { align: "start" as const, previewClassName: "p-4 sm:p-6" }
    : {}

  return (
    <DocsPage
      title={doc.title}
      description={doc.description}
      href={docHref(doc)}
      toc={toc}
      actions={
        <DocsCopyPage
          page={markdown}
          url={absoluteUrl(docHref(doc))}
          registryUrl={registryItemUrl(doc.name)}
        />
      }
    >
      <JsonLd
        data={[
          registryItemJsonLd({ name: doc.name, title: doc.title, description: doc.description, path: docHref(doc) }),
          breadcrumbJsonLd([
            { name: "Docs", path: "/docs" },
            { name: isBlock ? "Blocks" : "Components", path: isBlock ? "/docs/blocks" : "/docs/components" },
            { name: doc.title, path: docHref(doc) },
          ]),
        ]}
      />
      {first ? <ComponentPreview name={first.name} {...previewProps} /> : null}

      <H2>Installation</H2>
      <CodeTabs>
        <CodeTabsList>
          <CodeTabsTrigger value="cli">Command</CodeTabsTrigger>
          <CodeTabsTrigger value="manual">Manual</CodeTabsTrigger>
        </CodeTabsList>
        <TabsContent value="cli">
          <InstallCommand name={doc.name} />
          {registryDeps.length ? (
            <p className="text-muted-foreground text-sm">
              Also installs{" "}
              {registryDeps.map((dep, index) => (
                <span key={dep}>
                  <code>{dep}</code>
                  {index < registryDeps.length - 1 ? ", " : ""}
                </span>
              ))}{" "}
              from shadcn/ui if missing.
            </p>
          ) : null}
        </TabsContent>
        <TabsContent value="manual">
          {npmDeps.length ? (
            <>
              <p>Install the following dependencies:</p>
              <NpmInstallCommand packages={npmDeps} />
            </>
          ) : null}
          {registryDeps.length ? (
            <p>
              Add the shadcn/ui{" "}
              {registryDeps.map((dep, index) => (
                <span key={dep}>
                  <code>{dep}</code>
                  {index < registryDeps.length - 1 ? ", " : ""}
                </span>
              ))}{" "}
              {registryDeps.length === 1 ? "component" : "components"} if your
              project does not have {registryDeps.length === 1 ? "it" : "them"}{" "}
              yet.
            </p>
          ) : null}
          <p>Copy and paste the following code into your project.</p>
          {item.files.map((file) => (
            <ComponentSource key={file.path} src={file.path} title={consumerPath(file)} />
          ))}
          <p>Update the import paths to match your project setup.</p>
        </TabsContent>
      </CodeTabs>

      <H2>Usage</H2>
      <CodeBlock code={doc.usage} />

      {rest.length ? (
        <>
          <H2>Examples</H2>
          {rest.map((example) => (
            <div key={example.name}>
              <H3 id={slugify(example.title ?? example.name)}>
                {example.title ?? example.name}
              </H3>
              {example.description ? <p>{example.description}</p> : null}
              <ComponentPreview name={example.name} {...previewProps} />
            </div>
          ))}
        </>
      ) : null}
    </DocsPage>
  )
}
