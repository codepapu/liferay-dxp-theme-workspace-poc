# my-workspace

Liferay DXP **workspace** for portal customization: OSGi modules, themes, and client extensions. The main focus is **portal-wide [shadcn/ui v4](https://ui.shadcn.com) theming** for Liferay internal pages, Control Panel, and the product navigation menu — implemented with **override modules only** (no client-extension theme CSS required for core chrome).

Target platform: **Liferay DXP 2026.q1** (`liferay.workspace.product=dxp-2026.q1.0`).

## What this workspace does

| Area | Description |
|------|-------------|
| **shadcn global skin** | Injects design tokens, bundled CSS, and light/dark mode on every page |
| **Product menu** | Restyles Liferay’s side navigation to match shadcn Sidebar patterns |
| **Control Panel** | Maps Clay/admin UI surfaces to shadcn token colors |
| **Theme deployer** | Automatically applies a theme to all site layout sets on startup |
| **Client extensions** | Optional React/custom-element widgets (e.g. analytics dashboard) |

See [MY_PORTAL_SHADCN_THEME.md](./MY_PORTAL_SHADCN_THEME.md) for architecture, asset load order, and customization details.

## Prerequisites

- **JDK 17+**
- **Gradle** (wrapper included: `./gradlew`)
- A running **Liferay DXP** bundle (not committed to this repo)

## Quick start

### 1. Point the workspace at your Liferay bundle

`gradle-local.properties` is gitignored (machine-specific). Copy the example:

```bash
cp gradle-local.properties.example gradle-local.properties
```

Edit `liferay.workspace.home.dir` to your DXP install path, for example:

```properties
liferay.workspace.home.dir=../liferay-dxp
```

### 2. Deploy the shadcn modules

```bash
./gradlew :modules:my-portal-shadcn-global:deploy \
  :modules:my-portal-theme-contributor:deploy \
  :modules:my-portal-product-menu-override:deploy \
  :modules:my-portal-theme-deployer:deploy
```

On Windows (PowerShell):

```powershell
.\gradlew :modules:my-portal-shadcn-global:deploy `
  :modules:my-portal-theme-contributor:deploy `
  :modules:my-portal-product-menu-override:deploy `
  :modules:my-portal-theme-deployer:deploy
```

Restart Liferay if it was already running so OSGi picks up new bundles.

### 3. Verify

1. Open any site page — background uses shadcn `--background`.
2. Open Control Panel — product menu uses `--sidebar` tokens.
3. Use the sun/moon icon in the **top control menu** to switch light/dark mode.
4. Confirm assets load (HTTP 200):
   - `/o/my-portal-shadcn-global/css/portal_shadcn_bundle.css`
   - `/o/my-portal-shadcn-global/js/shadcn-theme-toggle.js`

## Modules

| Project | Type | Purpose |
|---------|------|---------|
| `modules/my-portal-shadcn-global` | OSGi | Tokens, critical inline CSS, bundled styles, theme toggle, DynamicIncludes |
| `modules/my-portal-theme-contributor` | Theme contributor | Control Panel theme contributor hook (CSS pipeline) |
| `modules/my-portal-product-menu-override` | OSGi DynamicInclude | Product menu CSS override layer |
| `modules/my-portal-theme-deployer` | OSGi lifecycle | Sets theme on all layout sets (`THEME_ID`, currently `dialect`) |
| `modules/my-portal-theme` | WAR theme | Optional site theme (`themeId`: `myportaltheme`) |
| `themes/my-portal-theme` | JS theme | Alternate theme project location |

## Client extensions

| Project | Purpose |
|---------|---------|
| `client-extensions/dda-analytics-highcharts-dashboard` | Analytics dashboard widgets (Highcharts) |

Deploy client extensions separately when needed:

```bash
./gradlew :client-extensions:dda-analytics-highcharts-dashboard:deploy
```

## Workspace layout

```
my-workspace/
├── modules/                 # OSGi modules (Java) and WAR themes
├── themes/                  # Frontend themes
├── client-extensions/       # Liferay client extensions
├── configs/                 # Environment-specific Liferay configs
├── gradle-local.properties  # Local bundle path (gitignored — use .example)
├── gradle.properties        # Workspace product version
└── MY_PORTAL_SHADCN_THEME.md
```

## Customize

- **Colors / tokens:** `modules/my-portal-shadcn-global/src/main/resources/META-INF/resources/css/_shadcn_tokens.scss`
- **Product menu:** `.../css/bundle_product_menu.scss`
- **Control Panel chrome:** `.../css/liferay_internal.scss`
- **Theme id:** keep `MyPortalThemeDeployerPortalInstanceLifecycleListener.THEME_ID` in sync with your deployed theme

JavaScript API for theme switching:

```js
window.MyPortalShadcnTheme.toggle();
window.MyPortalShadcnTheme.apply('dark');
```

## Build a single module

```bash
./gradlew :modules:my-portal-shadcn-global:deploy
```

## Limits

- Portlets still use **Clay** markup; this is a **token/CSS skin**, not React shadcn components inside every portlet.
- Changing product menu **HTML structure** requires additional JSP or frontend overrides.
- The optional WAR theme may need `buildTheme` fixes before `myportaltheme` replaces `dialect`.

## Further reading

- [Liferay Workspace](https://learn.liferay.com/w/dxp/development/tooling/liferay-workspace)
- [shadcn/ui theming](https://ui.shadcn.com/docs/theming)
- [GETTING_STARTED.md](./GETTING_STARTED.md) — default Liferay workspace guide

## License

Liferay modules follow Liferay’s standard licensing. Client extension and custom module code: use your project license as appropriate.
"# my-workspace" 
"# liferay-dxp-theme-workspace-poc" 
