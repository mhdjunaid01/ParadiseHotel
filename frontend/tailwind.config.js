/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			serif: [
  				'var(--font-serif)',
  				'Georgia',
  				'serif'
  			]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': '#f0f7f4',
  				'100': '#dce8e2',
  				'200': '#b8d1c5',
  				'300': '#8fb5a3',
  				'400': '#5d8f7a',
  				'500': '#1a5d47',
  				'600': '#164d3b',
  				'700': '#133d2f',
  				'800': '#0f2e24',
  				'900': '#0c1f19',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			forest: {
  				'50': '#f0f7f4',
  				'100': '#dce8e2',
  				'200': '#b8d1c5',
  				'300': '#8fb5a3',
  				'400': '#5d8f7a',
  				'500': '#1a5d47',
  				'600': '#164d3b',
  				'700': '#133d2f',
  				'800': '#0f2e24',
  				'900': '#0c1f19'
  			},
  			beige: {
  				'50': '#faf9f7',
  				'100': '#f5f3f0',
  				'200': '#ebe7e1',
  				'300': '#d6cec3',
  				'400': '#c2b5a5',
  				'500': '#a8957f',
  				'600': '#8b7a66',
  				'700': '#6e5f4d',
  				'800': '#514433',
  				'900': '#34291a'
  			},
  			gold: {
  				'50': '#fffbf0',
  				'100': '#fff7e0',
  				'200': '#ffefc1',
  				'300': '#ffe7a2',
  				'400': '#ffdf83',
  				'500': '#d4af37',
  				'600': '#b8941f',
  				'700': '#9c7a07',
  				'800': '#7f5f00',
  				'900': '#624400'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in': {
  				from: {
  					transform: 'translateX(-100%)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out',
  			'slide-in': 'slide-in 0.3s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};


