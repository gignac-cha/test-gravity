# 🏀 Basketball Gravity Simulation

A realistic physics simulation showing basketballs falling under Earth's gravitational field. Built with TypeScript, HTML5 Canvas, and accurate physics calculations.

> 🤖 **AI-Generated Project**: This entire codebase was created using Claude AI (Anthropic) through conversational programming. From physics calculations to UI interactions, every line of code was generated through AI assistance.

## 🚀 Demo

[Live Demo on GitHub Pages](https://gignac-cha.github.io/test-gravity/)

## ✨ Features

- **Realistic Physics**: Uses actual gravitational constant and Earth/basketball specifications
- **Multiple Objects**: 11 basketballs dropping from different heights (5m-15m)
- **Interactive Controls**: Mouse wheel zoom and drag panning
- **Collision Detection**: Elastic bouncing with energy loss (restitution = 0.8)
- **Real-time Simulation**: 60fps rendering with accurate physics timing
- **Visual Effects**: Transparent objects with borders and color coding

## 🎮 Controls

- **Mouse Wheel**: Zoom in/out (10⁻¹⁰ to 10¹⁰ scale)
- **Mouse Drag**: Pan camera view
- **Auto-play**: Physics simulation runs automatically

## 🔬 Physics Accuracy

The simulation uses precise real-world values:

- **Gravitational Constant**: G = 6.6743015×10⁻¹¹ N⋅m²/kg² (CODATA 2018)
- **Earth**: Mass = 5.972×10²⁴ kg, Radius = 6.378×10⁶ m
- **Basketball**: Mass = 0.624 kg, Radius = 0.1194 m (NBA official specs)
- **Collision**: Restitution coefficient = 0.8

## 🛠️ Technology Stack

- **TypeScript** - Type-safe physics calculations
- **HTML5 Canvas** - High-performance rendering
- **Vite** - Modern build tool and dev server
- **SCSS** - Enhanced styling
- **GitHub Actions** - Automated deployment

## 🏗️ Architecture

```
├── vector2.ts          # 2D vector mathematics
├── celestial-body.ts   # Physics objects (mass, position, velocity)
├── physics-engine.ts   # Gravitational force calculations
├── canvas-renderer.ts  # Drawing utilities with effects
├── gravity-simulation.ts # Main simulation controller
└── script.ts           # Entry point and animation loop
```

## 🚀 Development

### Prerequisites

- Node.js 24+
- pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/gignac-cha/test-gravity.git
cd test-gravity

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📊 Simulation Details

### Initial Setup
- **11 basketballs** positioned at heights 5m to 15m
- **Horizontal spread**: Each ball offset by 1m horizontally
- **Zero initial velocity**: All balls start from rest

### Physics Calculations
- **Gravitational Force**: F = G × m₁ × m₂ / r²
- **Acceleration**: a = F / m (Newton's Second Law)
- **Position Integration**: Verlet integration for stability
- **Collision Response**: Elastic collision with energy loss

### Performance
- **60 FPS** rendering using `requestAnimationFrame`
- **Real-time physics** (1:1 time scale)
- **Efficient collision detection** per frame
- **Smooth zoom/pan** with mouse controls

## 🎯 Educational Value

This simulation demonstrates:
- Newton's Law of Universal Gravitation
- Free fall physics and terminal velocity concepts
- Elastic collision mechanics
- Real-time physics integration
- Interactive scientific visualization

## 📝 License

MIT License - feel free to use for educational purposes!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add new physics features
- Improve visual effects
- Optimize performance
- Add educational content

## 🤖 AI Development Process

This project demonstrates the power of AI-assisted development:

- **Conversational Programming**: Built through natural language interactions with Claude AI
- **Iterative Development**: Features added and refined through AI collaboration  
- **Physics Accuracy**: AI ensured correct implementation of real-world physics constants
- **Code Quality**: TypeScript, modular architecture, and best practices implemented by AI
- **Documentation**: Comprehensive docs generated automatically

### Development Timeline ⚡
**Total Development Time: ~2-3 hours**

1. **Canvas setup & basic physics** (30 mins)
2. **Modular architecture & TypeScript** (45 mins)
3. **Multiple objects & collision detection** (30 mins)
4. **Interactive controls (zoom, pan)** (20 mins)
5. **GitHub Actions deployment** (15 mins)
6. **Documentation & polish** (20 mins)

> 💡 **Rapid Prototyping**: What traditionally takes days or weeks was accomplished in hours through AI-assisted development!

---

*Built with ❤️ and 🤖 Claude AI for physics education and interactive learning*