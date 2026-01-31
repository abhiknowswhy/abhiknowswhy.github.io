# Unused Components

This folder contains components that have been created but are not currently used in the project. They are kept here for potential future use.

## Available Designs

### StatsShowcase.tsx
Contains 6 different stats display components. All support dark/light mode.

| Component | Description | Best For |
|-----------|-------------|----------|
| `StatsProgressRings` | Circular progress indicators with animated counters | Hero sections, dashboards |
| `StatsBentoGrid` | Asymmetric grid with featured large card | Landing pages, about sections |
| `StatsHoverDetails` | Cards that flip on hover to show more info | Interactive portfolios |
| `StatsGlassBar` | **Currently in use** - Frosted glass horizontal bar | Minimal, modern designs |
| `StatsSparklines` | Stats with mini trend charts | Data-driven portfolios |
| `Stats3DTilt` | Cards with 3D mouse-follow tilt effect | Creative/gaming portfolios |

### How to Use

1. Import the desired component:
   ```tsx
   import { StatsProgressRings } from '@/components/unused/StatsShowcase';
   ```

2. Pass stats data:
   ```tsx
   const stats = [
     { value: 15, label: 'Projects', icon: <Code className="w-6 h-6" />, suffix: '+', color: '#3B82F6' },
     // ... more stats
   ];
   
   <StatsProgressRings stats={stats} />
   ```

### Props Interface
```tsx
interface StatItem {
  value: number;      // The number to display
  label: string;      // Label below the number
  icon: React.ReactNode;  // Lucide icon or any React element
  suffix?: string;    // Optional suffix like '+' or '%'
  color: string;      // Hex color for accents
}
```
