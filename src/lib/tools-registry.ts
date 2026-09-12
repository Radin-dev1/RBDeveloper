export type ToolSection = "gui" | "scripts";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
  premium: boolean;
  status: "live" | "coming-soon";
}

export interface ToolCategory {
  slug: string;
  name: string;
  section: ToolSection;
  icon: string;
  color: string;
  tools: Tool[];
}

export const GUI_CATEGORIES: ToolCategory[] = [
  {
    slug: "ui-components",
    name: "UI Components",
    section: "gui",
    icon: "⬜",
    color: "#3b82f6",
    tools: [
      { slug: "frame-builder", name: "Frame Builder", description: "Design and configure Frame instances with visual controls", icon: "◻️", premium: false, status: "live" },
      { slug: "text-label-designer", name: "TextLabel Designer", description: "Create styled text labels with live preview", icon: "🔤", premium: false, status: "live" },
      { slug: "text-button-creator", name: "TextButton Creator", description: "Build interactive text buttons with states", icon: "🔘", premium: false, status: "coming-soon" },
      { slug: "image-label-editor", name: "ImageLabel Editor", description: "Configure image display elements", icon: "🖼️", premium: false, status: "coming-soon" },
      { slug: "image-button-maker", name: "ImageButton Maker", description: "Create clickable image buttons", icon: "🎯", premium: false, status: "coming-soon" },
      { slug: "scrolling-frame", name: "ScrollingFrame Builder", description: "Design scrollable containers", icon: "📜", premium: false, status: "coming-soon" },
      { slug: "text-box-designer", name: "TextBox Designer", description: "Build text input fields", icon: "✏️", premium: false, status: "coming-soon" },
      { slug: "viewport-frame", name: "ViewportFrame Creator", description: "3D viewport display configuration", icon: "🎥", premium: true, status: "coming-soon" },
      { slug: "billboard-gui", name: "BillboardGui Builder", description: "Create 3D world-space UI", icon: "📋", premium: false, status: "coming-soon" },
      { slug: "surface-gui", name: "SurfaceGui Designer", description: "Design UI on part surfaces", icon: "🧱", premium: false, status: "coming-soon" },
      { slug: "screen-gui", name: "ScreenGui Manager", description: "Manage screen overlay configuration", icon: "🖥️", premium: false, status: "coming-soon" },
      { slug: "canvas-group", name: "CanvasGroup Editor", description: "Group UI for batch transparency", icon: "📐", premium: true, status: "coming-soon" },
      { slug: "video-frame", name: "VideoFrame Player", description: "Video playback configuration", icon: "▶️", premium: true, status: "coming-soon" },
      { slug: "proximity-prompt", name: "ProximityPrompt Builder", description: "Interactive proximity prompts", icon: "💬", premium: false, status: "coming-soon" },
      { slug: "highlight-effect", name: "Highlight Effect", description: "Object highlighting configuration", icon: "✨", premium: false, status: "coming-soon" },
    ],
  },
  {
    slug: "layout-constraints",
    name: "Layout & Constraints",
    section: "gui",
    icon: "📏",
    color: "#8b5cf6",
    tools: [
      { slug: "list-layout", name: "UIListLayout Config", description: "Vertical/horizontal list arrangement", icon: "📋", premium: false, status: "live" },
      { slug: "grid-layout", name: "UIGridLayout Config", description: "Grid-based element arrangement", icon: "🔲", premium: false, status: "coming-soon" },
      { slug: "table-layout", name: "UITableLayout Config", description: "Table-based layout system", icon: "📊", premium: false, status: "coming-soon" },
      { slug: "page-layout", name: "UIPageLayout Config", description: "Swipeable page navigation", icon: "📄", premium: true, status: "coming-soon" },
      { slug: "flex-item", name: "UIFlexItem Config", description: "Flexible sizing within layouts", icon: "↔️", premium: false, status: "coming-soon" },
      { slug: "padding-calc", name: "UIPadding Calculator", description: "Inner spacing configuration", icon: "⬛", premium: false, status: "live" },
      { slug: "scale-tool", name: "UIScale Tool", description: "Proportional scaling for UI trees", icon: "🔍", premium: false, status: "coming-soon" },
      { slug: "aspect-ratio", name: "Aspect Ratio Constraint", description: "Maintain element proportions", icon: "📐", premium: false, status: "live" },
      { slug: "size-constraint", name: "UISizeConstraint Config", description: "Min/max size boundaries", icon: "📏", premium: false, status: "coming-soon" },
      { slug: "text-size-constraint", name: "UITextSizeConstraint", description: "Text size limits", icon: "🔡", premium: false, status: "coming-soon" },
      { slug: "absolute-position", name: "Absolute Positioning", description: "Pixel-perfect element placement", icon: "📌", premium: false, status: "coming-soon" },
      { slug: "responsive-builder", name: "Responsive Layout Builder", description: "Multi-device responsive layouts", icon: "📱", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "styling-effects",
    name: "Styling & Effects",
    section: "gui",
    icon: "🎨",
    color: "#ec4899",
    tools: [
      { slug: "corner-radius", name: "UICorner Radius Picker", description: "Rounded corner configuration", icon: "⭕", premium: false, status: "live" },
      { slug: "stroke-designer", name: "UIStroke Designer", description: "Border and outline styling", icon: "🖊️", premium: false, status: "live" },
      { slug: "gradient-builder", name: "UIGradient Builder", description: "Color gradient design tool", icon: "🌈", premium: false, status: "live" },
      { slug: "shadow-generator", name: "Shadow Generator", description: "Drop shadow configuration", icon: "🌑", premium: false, status: "coming-soon" },
      { slug: "glow-creator", name: "Glow Effect Creator", description: "Glowing border and fill effects", icon: "💡", premium: false, status: "coming-soon" },
      { slug: "blur-designer", name: "Blur Effect Designer", description: "Background blur configuration", icon: "🔮", premium: true, status: "coming-soon" },
      { slug: "color-correction", name: "Color Correction Tool", description: "Post-processing color adjustments", icon: "🎛️", premium: true, status: "coming-soon" },
      { slug: "sunrays", name: "Sunrays Generator", description: "Volumetric light rays effect", icon: "☀️", premium: true, status: "coming-soon" },
      { slug: "bloom", name: "Bloom Effect Config", description: "HDR bloom configuration", icon: "🌟", premium: true, status: "coming-soon" },
      { slug: "depth-of-field", name: "Depth of Field", description: "Focus blur effect setup", icon: "📸", premium: true, status: "coming-soon" },
      { slug: "transparency", name: "Transparency Controller", description: "Multi-layer transparency manager", icon: "👻", premium: false, status: "coming-soon" },
      { slug: "zindex-manager", name: "ZIndex Manager", description: "UI layering order tool", icon: "📚", premium: false, status: "coming-soon" },
      { slug: "clips-descendants", name: "ClipsDescendants Toggle", description: "Overflow clipping configuration", icon: "✂️", premium: false, status: "coming-soon" },
      { slug: "rotation-tool", name: "Rotation Tool", description: "Element rotation configuration", icon: "🔄", premium: false, status: "coming-soon" },
      { slug: "size-position", name: "Size & Position Animator", description: "Animate size and position changes", icon: "↗️", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "color-tools",
    name: "Color Tools",
    section: "gui",
    icon: "🎨",
    color: "#f59e0b",
    tools: [
      { slug: "color-palette", name: "Color Palette Generator", description: "Generate harmonious Roblox color palettes", icon: "🎨", premium: false, status: "live" },
      { slug: "color3-picker", name: "Color3 Picker", description: "Visual Color3.fromRGB picker", icon: "🖌️", premium: false, status: "live" },
      { slug: "brickcolor-browser", name: "BrickColor Browser", description: "Browse all BrickColor values", icon: "🧱", premium: false, status: "coming-soon" },
      { slug: "hex-converter", name: "Hex to Color3", description: "Convert hex codes to Color3", icon: "🔄", premium: false, status: "live" },
      { slug: "rgb-converter", name: "RGB to Color3", description: "Convert RGB values to Color3", icon: "🔢", premium: false, status: "coming-soon" },
      { slug: "color-harmony", name: "Color Harmony", description: "Generate complementary & analogous colors", icon: "🌀", premium: false, status: "coming-soon" },
      { slug: "gradient-mixer", name: "Gradient Color Mixer", description: "Blend and interpolate colors", icon: "🌊", premium: false, status: "coming-soon" },
      { slug: "contrast-checker", name: "Contrast Checker", description: "Check text readability on backgrounds", icon: "👁️", premium: false, status: "coming-soon" },
      { slug: "theme-generator", name: "Theme Color Generator", description: "Generate full UI color themes", icon: "🎭", premium: true, status: "coming-soon" },
      { slug: "colorblind-sim", name: "Color Blind Simulator", description: "Preview colors for color blindness", icon: "👓", premium: true, status: "coming-soon" },
      { slug: "color-from-image", name: "Color From Image", description: "Extract palette from uploaded images", icon: "📷", premium: true, status: "coming-soon" },
      { slug: "color-library", name: "Custom Color Library", description: "Save and organize color collections", icon: "📚", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "typography",
    name: "Typography",
    section: "gui",
    icon: "🔤",
    color: "#14b8a6",
    tools: [
      { slug: "font-browser", name: "Roblox Font Browser", description: "Preview all available Roblox fonts", icon: "🔠", premium: false, status: "live" },
      { slug: "font-size-calc", name: "Font Size Calculator", description: "Calculate responsive font sizes", icon: "🔢", premium: false, status: "coming-soon" },
      { slug: "text-scaling", name: "Text Scaling Preview", description: "Preview TextScaled behavior", icon: "📏", premium: false, status: "coming-soon" },
      { slug: "rich-text", name: "Rich Text Editor", description: "Roblox rich text markup builder", icon: "✍️", premium: false, status: "live" },
      { slug: "text-stroke", name: "Text Stroke Preview", description: "Configure text outline effects", icon: "🖊️", premium: false, status: "coming-soon" },
      { slug: "text-wrap", name: "TextWrapped Simulator", description: "Preview text wrapping behavior", icon: "↩️", premium: false, status: "coming-soon" },
      { slug: "line-height", name: "Line Height Calculator", description: "Calculate optimal line spacing", icon: "↕️", premium: false, status: "coming-soon" },
      { slug: "text-alignment", name: "Text Alignment Tool", description: "Visual text alignment configuration", icon: "📐", premium: false, status: "coming-soon" },
      { slug: "multiline-editor", name: "MultiLine Text Editor", description: "Multi-line text content editor", icon: "📝", premium: false, status: "coming-soon" },
      { slug: "font-pairing", name: "Font Pairing Suggestions", description: "AI-powered font combination ideas", icon: "💡", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "animation-tweening",
    name: "Animation & Tweening",
    section: "gui",
    icon: "🎬",
    color: "#ef4444",
    tools: [
      { slug: "tween-builder", name: "Tween Builder", description: "Visual TweenService configuration", icon: "🎬", premium: false, status: "live" },
      { slug: "easing-visualizer", name: "Easing Function Visualizer", description: "Preview all easing styles", icon: "📈", premium: false, status: "live" },
      { slug: "spring-animation", name: "Spring Animation Designer", description: "Physics-based spring animations", icon: "🌀", premium: true, status: "coming-soon" },
      { slug: "keyframe-creator", name: "Keyframe Animation Creator", description: "Multi-keyframe animation builder", icon: "🎞️", premium: true, status: "coming-soon" },
      { slug: "transition-builder", name: "UI Transition Builder", description: "Screen transition effects", icon: "🔀", premium: false, status: "coming-soon" },
      { slug: "fade-generator", name: "Fade Effect Generator", description: "Fade in/out animation builder", icon: "🌫️", premium: false, status: "coming-soon" },
      { slug: "slide-creator", name: "Slide Animation Creator", description: "Slide entry/exit animations", icon: "➡️", premium: false, status: "coming-soon" },
      { slug: "scale-animation", name: "Scale Animation Builder", description: "Grow and shrink animations", icon: "🔍", premium: false, status: "coming-soon" },
      { slug: "rotation-animation", name: "Rotation Animation", description: "Spinning and rotating effects", icon: "🔄", premium: false, status: "coming-soon" },
      { slug: "bounce-creator", name: "Bounce Effect Creator", description: "Bouncy animation presets", icon: "⚡", premium: false, status: "coming-soon" },
      { slug: "sequence-builder", name: "Sequence Builder", description: "Chain multiple tweens together", icon: "🔗", premium: true, status: "coming-soon" },
      { slug: "animation-timeline", name: "Animation Timeline", description: "Visual timeline editor for animations", icon: "⏱️", premium: true, status: "coming-soon" },
      { slug: "property-interpolator", name: "Property Interpolator", description: "Interpolate between property values", icon: "📊", premium: false, status: "coming-soon" },
      { slug: "bezier-editor", name: "Bezier Curve Editor", description: "Custom cubic bezier curve editor", icon: "〰️", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "templates-kits",
    name: "Templates & Kits",
    section: "gui",
    icon: "📦",
    color: "#6366f1",
    tools: [
      { slug: "main-menu", name: "Main Menu Template", description: "Complete main menu UI kit", icon: "🏠", premium: false, status: "live" },
      { slug: "hud-display", name: "HUD / Heads-Up Display", description: "In-game HUD overlay template", icon: "🎮", premium: false, status: "coming-soon" },
      { slug: "inventory-ui", name: "Inventory System UI", description: "Grid-based inventory interface", icon: "🎒", premium: true, status: "coming-soon" },
      { slug: "shop-ui", name: "Shop / Store UI", description: "In-game store interface template", icon: "🛒", premium: true, status: "coming-soon" },
      { slug: "settings-menu", name: "Settings Menu", description: "Game settings panel template", icon: "⚙️", premium: false, status: "coming-soon" },
      { slug: "loading-screen", name: "Loading Screen Builder", description: "Custom loading screen designs", icon: "⏳", premium: false, status: "coming-soon" },
      { slug: "health-bar", name: "Health Bar / Status Bar", description: "Animated health and status bars", icon: "❤️", premium: false, status: "coming-soon" },
      { slug: "notification-system", name: "Notification System", description: "Toast and alert notification UI", icon: "🔔", premium: false, status: "coming-soon" },
      { slug: "chat-ui", name: "Chat UI Template", description: "Custom chat interface design", icon: "💬", premium: true, status: "coming-soon" },
      { slug: "leaderboard-ui", name: "Leaderboard UI", description: "Scoreboard and ranking display", icon: "🏆", premium: false, status: "coming-soon" },
      { slug: "minimap", name: "Mini Map Template", description: "In-game minimap overlay", icon: "🗺️", premium: true, status: "coming-soon" },
      { slug: "quest-tracker", name: "Quest Tracker UI", description: "Quest objectives display", icon: "📋", premium: true, status: "coming-soon" },
      { slug: "dialog-system", name: "Dialog System UI", description: "NPC dialog and choice interface", icon: "🗣️", premium: true, status: "coming-soon" },
      { slug: "tooltip-system", name: "Tooltip System", description: "Hover tooltip components", icon: "💭", premium: false, status: "coming-soon" },
    ],
  },
  {
    slug: "game-design-visual",
    name: "Game Design Visual",
    section: "gui",
    icon: "🎮",
    color: "#22c55e",
    tools: [
      { slug: "map-planner", name: "Map Layout Planner", description: "Plan game maps with zones and areas", icon: "🗺️", premium: false, status: "live" },
      { slug: "spawn-calculator", name: "Spawn Point Calculator", description: "Optimal spawn point positioning", icon: "📍", premium: false, status: "coming-soon" },
      { slug: "lighting-studio", name: "Lighting Studio", description: "Configure game lighting properties", icon: "💡", premium: false, status: "live" },
      { slug: "atmosphere-designer", name: "Atmosphere Designer", description: "Fog, haze, and atmosphere settings", icon: "🌫️", premium: false, status: "coming-soon" },
      { slug: "terrain-palette", name: "Terrain Color Palette", description: "Terrain material color configuration", icon: "🏔️", premium: false, status: "coming-soon" },
      { slug: "skybox-preview", name: "Skybox Preview", description: "Preview and configure skybox settings", icon: "🌅", premium: false, status: "coming-soon" },
      { slug: "particle-designer", name: "Particle Effect Designer", description: "Visual particle system builder", icon: "✨", premium: true, status: "coming-soon" },
      { slug: "beam-builder", name: "Beam Effect Builder", description: "Beam connection visual builder", icon: "⚡", premium: true, status: "coming-soon" },
      { slug: "trail-creator", name: "Trail Effect Creator", description: "Motion trail configuration", icon: "🌊", premium: false, status: "coming-soon" },
      { slug: "explosion-config", name: "Explosion Effect Config", description: "Explosion visual settings", icon: "💥", premium: false, status: "coming-soon" },
      { slug: "fire-designer", name: "Fire Effect Designer", description: "Fire particle configuration", icon: "🔥", premium: false, status: "coming-soon" },
      { slug: "smoke-config", name: "Smoke Effect Config", description: "Smoke visual settings", icon: "💨", premium: false, status: "coming-soon" },
      { slug: "sparkle-creator", name: "Sparkle Effect Creator", description: "Sparkle particle configuration", icon: "⭐", premium: false, status: "coming-soon" },
      { slug: "sound-visualizer", name: "Sound Visualizer", description: "Audio spatial configuration tool", icon: "🔊", premium: true, status: "coming-soon" },
      { slug: "camera-planner", name: "Camera Angle Planner", description: "Plan camera positions and angles", icon: "📹", premium: true, status: "coming-soon" },
      { slug: "viewport-layout", name: "Viewport Layout Tool", description: "ViewportFrame scene builder", icon: "🖼️", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "assets-resources",
    name: "Assets & Resources",
    section: "gui",
    icon: "📁",
    color: "#f97316",
    tools: [
      { slug: "decal-maker", name: "Decal Maker", description: "Create and apply decal textures", icon: "🖼️", premium: false, status: "coming-soon" },
      { slug: "texture-generator", name: "Texture Generator", description: "Generate seamless pattern textures", icon: "🔲", premium: true, status: "coming-soon" },
      { slug: "material-preview", name: "Material Preview", description: "Preview Roblox material types", icon: "🧱", premium: false, status: "live" },
      { slug: "mesh-viewer", name: "Mesh Viewer", description: "Preview mesh geometry", icon: "🔷", premium: true, status: "coming-soon" },
      { slug: "asset-lookup", name: "Asset ID Lookup", description: "Search and preview asset IDs", icon: "🔍", premium: false, status: "coming-soon" },
      { slug: "image-uploader", name: "Image Uploader", description: "Upload and configure images", icon: "📤", premium: true, status: "coming-soon" },
      { slug: "sound-browser", name: "Sound Browser", description: "Browse common sound effects", icon: "🔊", premium: false, status: "coming-soon" },
      { slug: "icon-pack", name: "Icon Pack Browser", description: "Browse Roblox-ready icon packs", icon: "🎯", premium: false, status: "coming-soon" },
      { slug: "badge-designer", name: "Badge Designer", description: "Design game badges", icon: "🏅", premium: false, status: "coming-soon" },
      { slug: "gamepass-icon", name: "Game Pass Icon Maker", description: "Create game pass icons", icon: "🎟️", premium: false, status: "coming-soon" },
      { slug: "thumbnail-builder", name: "Thumbnail Builder", description: "Design game thumbnails", icon: "📸", premium: true, status: "coming-soon" },
      { slug: "loading-icon", name: "Loading Icon Creator", description: "Animated loading indicators", icon: "⏳", premium: false, status: "coming-soon" },
      { slug: "cursor-designer", name: "Cursor Designer", description: "Custom mouse cursor designs", icon: "🖱️", premium: true, status: "coming-soon" },
      { slug: "emote-maker", name: "Emote Maker", description: "Design custom emote icons", icon: "😊", premium: true, status: "coming-soon" },
      { slug: "billboard-designer", name: "Billboard Designer", description: "3D billboard sign designs", icon: "📋", premium: false, status: "coming-soon" },
      { slug: "surface-art", name: "Surface Art Creator", description: "Art for part surfaces", icon: "🎨", premium: true, status: "coming-soon" },
    ],
  },
];

export const SCRIPTS_CATEGORIES: ToolCategory[] = [
  {
    slug: "code-editor",
    name: "Code Editor & IDE",
    section: "scripts",
    icon: "💻",
    color: "#3b82f6",
    tools: [
      { slug: "luau-editor", name: "Luau Code Editor", description: "Full-featured Luau code editor", icon: "💻", premium: false, status: "live" },
      { slug: "diff-viewer", name: "Script Diff Viewer", description: "Compare two scripts side by side", icon: "📊", premium: false, status: "coming-soon" },
      { slug: "code-minimap", name: "Code Minimap", description: "Scrollable code overview", icon: "🗺️", premium: true, status: "coming-soon" },
      { slug: "multi-cursor", name: "Multi-Cursor Editor", description: "Edit multiple locations at once", icon: "✏️", premium: true, status: "coming-soon" },
      { slug: "find-replace", name: "Find & Replace", description: "Advanced search and replace with regex", icon: "🔍", premium: false, status: "coming-soon" },
      { slug: "code-folding", name: "Code Folding", description: "Collapse and expand code blocks", icon: "📁", premium: false, status: "coming-soon" },
      { slug: "bracket-matcher", name: "Bracket Matcher", description: "Highlight matching brackets", icon: "🔗", premium: false, status: "coming-soon" },
      { slug: "goto-line", name: "Line Number Goto", description: "Jump to specific line numbers", icon: "📌", premium: false, status: "coming-soon" },
      { slug: "split-view", name: "Split View Editor", description: "Side-by-side code editing", icon: "◻️", premium: true, status: "coming-soon" },
      { slug: "readonly-viewer", name: "Read-Only Viewer", description: "Syntax-highlighted code viewer", icon: "👁️", premium: false, status: "coming-soon" },
      { slug: "code-playground", name: "Code Playground", description: "Test Luau snippets in browser", icon: "🎮", premium: false, status: "live" },
      { slug: "repl-console", name: "REPL Console", description: "Interactive Luau console", icon: "⌨️", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "script-templates",
    name: "Script Templates",
    section: "scripts",
    icon: "📄",
    color: "#8b5cf6",
    tools: [
      { slug: "server-script", name: "Server Script Template", description: "Boilerplate server-side scripts", icon: "🖥️", premium: false, status: "live" },
      { slug: "local-script", name: "Local Script Template", description: "Client-side script templates", icon: "💻", premium: false, status: "live" },
      { slug: "module-script", name: "Module Script Template", description: "Reusable module script patterns", icon: "📦", premium: false, status: "live" },
      { slug: "oop-class", name: "Object-Oriented Class", description: "OOP class structure template", icon: "🏗️", premium: false, status: "coming-soon" },
      { slug: "singleton", name: "Singleton Pattern", description: "Singleton module pattern", icon: "1️⃣", premium: false, status: "coming-soon" },
      { slug: "observer", name: "Observer Pattern", description: "Event-driven observer pattern", icon: "👁️", premium: false, status: "coming-soon" },
      { slug: "state-machine", name: "State Machine Template", description: "Finite state machine implementation", icon: "🔄", premium: false, status: "coming-soon" },
      { slug: "command-pattern", name: "Command Pattern", description: "Command pattern for undo/redo", icon: "⌨️", premium: true, status: "coming-soon" },
      { slug: "factory-pattern", name: "Factory Pattern", description: "Object factory pattern", icon: "🏭", premium: false, status: "coming-soon" },
      { slug: "event-system", name: "Event System Template", description: "Custom event system boilerplate", icon: "📡", premium: false, status: "coming-soon" },
      { slug: "promise-pattern", name: "Promise Pattern", description: "Promise-based async patterns", icon: "🤝", premium: false, status: "coming-soon" },
      { slug: "component-system", name: "Component System", description: "Entity component system template", icon: "🧩", premium: true, status: "coming-soon" },
      { slug: "plugin-template", name: "Plugin Template", description: "Roblox Studio plugin boilerplate", icon: "🔌", premium: false, status: "coming-soon" },
      { slug: "tool-template", name: "Tool Template", description: "Player tool script template", icon: "🔧", premium: false, status: "coming-soon" },
    ],
  },
  {
    slug: "code-generators",
    name: "Code Generators",
    section: "scripts",
    icon: "⚡",
    color: "#ec4899",
    tools: [
      { slug: "remote-event-gen", name: "RemoteEvent Generator", description: "Generate client-server event code", icon: "📡", premium: false, status: "live" },
      { slug: "remote-function-gen", name: "RemoteFunction Generator", description: "Generate request-response code", icon: "🔄", premium: false, status: "live" },
      { slug: "bindable-gen", name: "BindableEvent Generator", description: "Server-to-server event code", icon: "🔗", premium: false, status: "coming-soon" },
      { slug: "datastore-gen", name: "DataStore Generator", description: "Data persistence code generator", icon: "💾", premium: false, status: "live" },
      { slug: "tween-gen", name: "Tween Code Generator", description: "TweenService code from visual config", icon: "🎬", premium: false, status: "coming-soon" },
      { slug: "raycast-gen", name: "Raycast Generator", description: "Raycasting and hit detection code", icon: "📏", premium: false, status: "coming-soon" },
      { slug: "collision-gen", name: "Collision Detection", description: "Collision and touch event code", icon: "💥", premium: false, status: "coming-soon" },
      { slug: "input-handler-gen", name: "Input Handler Generator", description: "UserInputService code builder", icon: "🎮", premium: false, status: "coming-soon" },
      { slug: "gui-script-gen", name: "GUI Script Generator", description: "UI interaction script builder", icon: "🖥️", premium: false, status: "coming-soon" },
      { slug: "npc-ai-gen", name: "NPC AI Generator", description: "NPC behavior and AI code", icon: "🤖", premium: true, status: "coming-soon" },
      { slug: "pathfinding-gen", name: "Pathfinding Generator", description: "PathfindingService code builder", icon: "🗺️", premium: true, status: "coming-soon" },
      { slug: "sound-manager-gen", name: "Sound Manager Generator", description: "Audio management system code", icon: "🔊", premium: false, status: "coming-soon" },
      { slug: "camera-controller-gen", name: "Camera Controller Gen", description: "Custom camera system code", icon: "📹", premium: true, status: "coming-soon" },
      { slug: "inventory-gen", name: "Inventory System Gen", description: "Inventory management code", icon: "🎒", premium: true, status: "coming-soon" },
      { slug: "shop-gen", name: "Shop System Generator", description: "In-game shop/store code", icon: "🛒", premium: true, status: "coming-soon" },
      { slug: "chat-command-gen", name: "Chat Command Generator", description: "Text command parsing code", icon: "💬", premium: false, status: "coming-soon" },
      { slug: "admin-gen", name: "Admin System Generator", description: "Admin command system code", icon: "👑", premium: true, status: "coming-soon" },
      { slug: "leaderboard-gen", name: "Leaderboard Generator", description: "Leaderstat and ranking code", icon: "🏆", premium: false, status: "coming-soon" },
    ],
  },
  {
    slug: "formatters-quality",
    name: "Formatters & Quality",
    section: "scripts",
    icon: "✨",
    color: "#f59e0b",
    tools: [
      { slug: "luau-formatter", name: "Luau Formatter", description: "Auto-format Luau code with style options", icon: "📝", premium: false, status: "live" },
      { slug: "beautifier", name: "Code Beautifier", description: "Beautify messy or minified code", icon: "✨", premium: false, status: "coming-soon" },
      { slug: "minifier", name: "Minifier / Compressor", description: "Compress code for production", icon: "📦", premium: false, status: "coming-soon" },
      { slug: "dead-code", name: "Dead Code Detector", description: "Find unused variables and functions", icon: "💀", premium: true, status: "coming-soon" },
      { slug: "variable-renamer", name: "Variable Renamer", description: "Batch rename variables safely", icon: "🏷️", premium: true, status: "coming-soon" },
      { slug: "import-organizer", name: "Import Organizer", description: "Sort and organize require statements", icon: "📋", premium: false, status: "coming-soon" },
      { slug: "complexity-analyzer", name: "Code Complexity Analyzer", description: "Measure cyclomatic complexity", icon: "📊", premium: true, status: "coming-soon" },
      { slug: "style-checker", name: "Style Checker", description: "Enforce coding style guidelines", icon: "🎨", premium: false, status: "coming-soon" },
      { slug: "type-helper", name: "Type Annotation Helper", description: "Add Luau type annotations", icon: "🏷️", premium: true, status: "coming-soon" },
      { slug: "doc-generator", name: "Documentation Generator", description: "Generate function documentation", icon: "📖", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "debugging-testing",
    name: "Debugging & Testing",
    section: "scripts",
    icon: "🐛",
    color: "#ef4444",
    tools: [
      { slug: "print-debugger", name: "Print Debugger Builder", description: "Generate structured debug prints", icon: "🖨️", premium: false, status: "live" },
      { slug: "error-decoder", name: "Error Message Decoder", description: "Explain Roblox error messages", icon: "❌", premium: false, status: "live" },
      { slug: "stack-trace", name: "Stack Trace Analyzer", description: "Parse and explain stack traces", icon: "📚", premium: false, status: "coming-soon" },
      { slug: "perf-profiler", name: "Performance Profiler", description: "Code performance analysis tips", icon: "⚡", premium: true, status: "coming-soon" },
      { slug: "memory-monitor", name: "Memory Usage Monitor", description: "Memory allocation tracking guide", icon: "💾", premium: true, status: "coming-soon" },
      { slug: "network-logger", name: "Network Traffic Logger", description: "Remote event monitoring code", icon: "📡", premium: false, status: "coming-soon" },
      { slug: "assert-builder", name: "Assert Builder", description: "Create assertion statements", icon: "✅", premium: false, status: "coming-soon" },
      { slug: "test-generator", name: "Test Case Generator", description: "Generate unit test boilerplate", icon: "🧪", premium: true, status: "coming-soon" },
      { slug: "benchmark", name: "Benchmark Tool", description: "Compare code performance", icon: "📊", premium: false, status: "coming-soon" },
      { slug: "log-manager", name: "Log Level Manager", description: "Configurable logging system", icon: "📋", premium: false, status: "coming-soon" },
      { slug: "breakpoint-sim", name: "Breakpoint Simulator", description: "Simulate breakpoint behavior", icon: "🔴", premium: true, status: "coming-soon" },
      { slug: "watch-variable", name: "Watch Variable Tool", description: "Variable monitoring code gen", icon: "👁️", premium: true, status: "coming-soon" },
    ],
  },
  {
    slug: "api-reference",
    name: "API Reference",
    section: "scripts",
    icon: "📚",
    color: "#14b8a6",
    tools: [
      { slug: "api-browser", name: "Roblox API Browser", description: "Search and browse all Roblox APIs", icon: "🔍", premium: false, status: "live" },
      { slug: "property-reference", name: "Instance Property Reference", description: "Browse instance properties", icon: "📋", premium: false, status: "live" },
      { slug: "enum-browser", name: "Enum Browser", description: "Browse all Roblox enums and values", icon: "📊", premium: false, status: "live" },
      { slug: "service-reference", name: "Service Reference", description: "All Roblox services documented", icon: "🖥️", premium: false, status: "coming-soon" },
      { slug: "event-reference", name: "Event Reference", description: "Browse events by instance type", icon: "📡", premium: false, status: "coming-soon" },
      { slug: "method-reference", name: "Method Reference", description: "Browse methods by instance type", icon: "⚙️", premium: false, status: "coming-soon" },
      { slug: "type-reference", name: "Type Reference", description: "Luau type system reference", icon: "🏷️", premium: false, status: "coming-soon" },
      { slug: "globals-reference", name: "Global Function Reference", description: "All global functions documented", icon: "🌐", premium: false, status: "coming-soon" },
      { slug: "library-reference", name: "Library Reference", description: "Built-in library documentation", icon: "📚", premium: false, status: "coming-soon" },
      { slug: "deprecated-finder", name: "Deprecated API Finder", description: "Find deprecated API usage", icon: "⚠️", premium: false, status: "coming-soon" },
      { slug: "api-changelog", name: "API Change Log", description: "Track API changes over time", icon: "📝", premium: true, status: "coming-soon" },
      { slug: "class-hierarchy", name: "Class Hierarchy Viewer", description: "Visualize class inheritance", icon: "🌳", premium: false, status: "coming-soon" },
    ],
  },
  {
    slug: "datastore-storage",
    name: "DataStore & Storage",
    section: "scripts",
    icon: "💾",
    color: "#22c55e",
    tools: [
      { slug: "datastore-designer", name: "DataStore Designer", description: "Visual data structure designer", icon: "🏗️", premium: false, status: "live" },
      { slug: "ordered-datastore", name: "OrderedDataStore Tool", description: "Sorted data storage configuration", icon: "📊", premium: false, status: "coming-soon" },
      { slug: "global-datastore", name: "GlobalDataStore Manager", description: "Cross-server data management", icon: "🌐", premium: true, status: "coming-soon" },
      { slug: "data-serializer", name: "Data Serializer", description: "Serialize complex data types", icon: "📦", premium: false, status: "coming-soon" },
      { slug: "migration-planner", name: "Data Migration Planner", description: "Plan data schema migrations", icon: "🔄", premium: true, status: "coming-soon" },
      { slug: "session-lock", name: "Session Lock Manager", description: "Prevent data corruption code", icon: "🔒", premium: true, status: "coming-soon" },
      { slug: "data-backup", name: "Data Backup Generator", description: "Automated backup system code", icon: "💿", premium: true, status: "coming-soon" },
      { slug: "cache-builder", name: "Cache System Builder", description: "In-memory caching code", icon: "⚡", premium: false, status: "coming-soon" },
      { slug: "data-validator", name: "Data Validator", description: "Schema validation code generator", icon: "✅", premium: false, status: "coming-soon" },
      { slug: "budget-calculator", name: "DataStore Budget Calculator", description: "Calculate request budget usage", icon: "📈", premium: false, status: "live" },
    ],
  },
  {
    slug: "networking",
    name: "Networking",
    section: "scripts",
    icon: "🌐",
    color: "#6366f1",
    tools: [
      { slug: "remote-planner", name: "Remote Event Planner", description: "Plan client-server communication", icon: "📡", premium: false, status: "live" },
      { slug: "network-architecture", name: "Network Architecture", description: "Design network topology", icon: "🏗️", premium: true, status: "coming-soon" },
      { slug: "rate-limiter", name: "Rate Limiter Builder", description: "Request throttling code", icon: "⏱️", premium: false, status: "coming-soon" },
      { slug: "packet-calculator", name: "Packet Size Calculator", description: "Calculate remote event data size", icon: "📦", premium: false, status: "coming-soon" },
      { slug: "client-server-flow", name: "Client-Server Flow", description: "Visualize data flow diagrams", icon: "🔀", premium: false, status: "coming-soon" },
      { slug: "replication-planner", name: "Replication Planner", description: "Instance replication strategy", icon: "📋", premium: true, status: "coming-soon" },
      { slug: "network-debugger", name: "Network Debugger", description: "Network issue diagnosis code", icon: "🐛", premium: true, status: "coming-soon" },
      { slug: "bandwidth-calc", name: "Bandwidth Calculator", description: "Estimate bandwidth usage", icon: "📊", premium: false, status: "live" },
      { slug: "remote-spy", name: "Remote Spy Builder", description: "Monitor remote event traffic", icon: "🕵️", premium: true, status: "coming-soon" },
      { slug: "security-validator", name: "Security Validator", description: "Validate server-side security", icon: "🔒", premium: false, status: "coming-soon" },
    ],
  },
  {
    slug: "utilities",
    name: "Utilities & Tools",
    section: "scripts",
    icon: "🔧",
    color: "#f97316",
    tools: [
      { slug: "cframe-calc", name: "CFrame Calculator", description: "Calculate and visualize CFrame values", icon: "📐", premium: false, status: "live" },
      { slug: "vector3-helper", name: "Vector3 Math Helper", description: "Vector3 operations and visualization", icon: "📊", premium: false, status: "live" },
      { slug: "json-to-luau", name: "JSON to Luau Converter", description: "Convert JSON to Luau tables", icon: "🔄", premium: false, status: "live" },
      { slug: "string-pattern", name: "String Pattern Tester", description: "Test Lua string patterns live", icon: "🔤", premium: false, status: "live" },
      { slug: "math-evaluator", name: "Math Expression Evaluator", description: "Evaluate math expressions", icon: "🧮", premium: false, status: "coming-soon" },
      { slug: "random-generator", name: "Random Generator", description: "Random number and seed tools", icon: "🎲", premium: false, status: "coming-soon" },
      { slug: "uuid-generator", name: "UUID Generator", description: "Generate unique identifiers", icon: "🔑", premium: false, status: "coming-soon" },
      { slug: "time-converter", name: "Time Format Converter", description: "Convert between time formats", icon: "⏰", premium: false, status: "coming-soon" },
      { slug: "color-code-converter", name: "Color Code Converter", description: "Convert between color formats", icon: "🎨", premium: false, status: "live" },
      { slug: "whitelist-builder", name: "Whitelist/Blacklist Builder", description: "Access control list generator", icon: "📋", premium: false, status: "coming-soon" },
      { slug: "cooldown-manager", name: "Cooldown Manager", description: "Debounce and cooldown code", icon: "⏲️", premium: false, status: "coming-soon" },
      { slug: "tag-system", name: "Tag System Builder", description: "CollectionService tag manager", icon: "🏷️", premium: false, status: "coming-soon" },
      { slug: "attribute-helper", name: "Attribute Helper", description: "Instance attribute management", icon: "📌", premium: false, status: "coming-soon" },
      { slug: "collection-service", name: "CollectionService Manager", description: "Tag-based instance management", icon: "📁", premium: false, status: "coming-soon" },
    ],
  },
];

export const ALL_CATEGORIES = [...GUI_CATEGORIES, ...SCRIPTS_CATEGORIES];

export function getToolCount(section?: ToolSection): number {
  const cats = section
    ? ALL_CATEGORIES.filter((c) => c.section === section)
    : ALL_CATEGORIES;
  return cats.reduce((sum, c) => sum + c.tools.length, 0);
}

export function getLiveTools(section?: ToolSection): Tool[] {
  const cats = section
    ? ALL_CATEGORIES.filter((c) => c.section === section)
    : ALL_CATEGORIES;
  return cats.flatMap((c) => c.tools.filter((t) => t.status === "live"));
}

export function searchTools(query: string): { category: ToolCategory; tool: Tool }[] {
  const q = query.toLowerCase();
  const results: { category: ToolCategory; tool: Tool }[] = [];
  for (const cat of ALL_CATEGORIES) {
    for (const tool of cat.tools) {
      if (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q)
      ) {
        results.push({ category: cat, tool });
      }
    }
  }
  return results;
}
