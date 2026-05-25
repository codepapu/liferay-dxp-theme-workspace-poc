# My Portal — shadcn v4 override modules (no client extensions)

OSGi modules and a WAR theme that apply **shadcn/ui v4** design tokens portal-wide after `./gradlew deploy`. Nothing is dropped on pages or assigned in Client Extensions admin.

## Modules

| Project | Type | Purpose |
|---------|------|---------|
| `modules/my-portal-shadcn-global` | OSGi | Injects shadcn v4 CSS variables + light/dark toggle on **every** page |
| `modules/my-portal-theme` | WAR theme (optional) | Site pages: Clay/main mapped to shadcn tokens (`themeId`: `myportaltheme`). Build with `blade create -t theme` pattern if `buildTheme` fails; until then deployer uses `dialect` |
| `modules/my-portal-theme-contributor` | Theme contributor | Control Panel chrome + product menu (via Liferay theme contributor pipeline) |
| `modules/my-portal-product-menu-override` | OSGi DynamicInclude | Side navigation final CSS layer (loads **after** Liferay product-menu CSS) |
| `modules/my-portal-theme-deployer` | OSGi lifecycle | Sets `myportaltheme` on all site layout sets automatically |

## shadcn v4 tokens

Tokens follow the official neutral theme from [shadcn theming](https://ui.shadcn.com/docs/theming), including **sidebar** tokens used for the product menu:

- `--background`, `--foreground`, `--primary`, …
- `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, …
- Dark mode: `.dark` and `[data-theme='dark']`

Toggle: **Light mode / Dark mode** button (fixed fallback or in control menu when present). API: `window.MyPortalShadcnTheme.toggle()`.

## Deploy (liferay-dxp bundle)

`gradle-local.properties` points to `../liferay-dxp`.

```bash
cd my-workspace
./gradlew :modules:my-portal-shadcn-global:deploy :modules:my-portal-theme-contributor:deploy :modules:my-portal-product-menu-override:deploy :modules:my-portal-theme-deployer:deploy
```

Restart Liferay if it was already running so OSGi picks up new bundles.

Optional WAR theme (when `buildTheme` is fixed):

```bash
./gradlew :modules:my-portal-theme:deploy
```

Then set `THEME_ID = "myportaltheme"` in `MyPortalThemeDeployerPortalInstanceLifecycleListener`.

## Verify

**Load order (anti-flicker):**
1. Inline `<style>` with tokens in `<head>` (no network)
2. One bundled CSS: `/o/my-portal-shadcn-global/css/portal_shadcn_bundle.css`
3. Toggle JS deferred at bottom of page

1. Open any site page — background uses shadcn `--background`.
2. Open Control Panel — side product menu uses `--sidebar` colors.
3. Click **Light mode / Dark mode** — menu and page update together.
4. New sites (after deployer runs) use theme `myportaltheme` without Look & Feel configuration.

## Customize

- **Colors:** edit `_shadcn_tokens.scss` in `my-portal-shadcn-global` (and theme copy if needed).
- **Sidebar width:** `$product-menu-width` in `product_menu_override.scss` and `_product_menu.scss`.
- **Theme id:** keep `myportaltheme` in `liferay-look-and-feel.xml` and `MyPortalThemeDeployerPortalInstanceLifecycleListener.THEME_ID` in sync.

## Limits

- Internal portlets still use **Clay** markup; this is a **token skin**, not React shadcn components in every portlet.
- Changing menu **HTML/structure** requires additional JSP/React overrides in a separate module.
- Only one Liferay `controlPanel` theme CSS client extension can be active; this stack does not use client extensions.

## Build single module

```bash
./gradlew :modules:my-portal-shadcn-global:deploy
./gradlew :themes:my-portal-theme:deploy
```
