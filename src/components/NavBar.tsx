import { NavLink } from 'react-router-dom'
import './NavBar.css'
import type { MenuItem } from '../types'

export const menuItems: MenuItem[] = [
  { label: 'Principal', path: '/' },
  { label: 'Guias', path: '/guides' },
  { label: 'Vendas de Pokemons', path: '/sales' },
  { label: 'Vendas de Itens', path: '/items' },  
  { label: 'Calculadora HP', path: '/hp-calculator' },
  { label: 'Lives', path: '/lives' },
]

function NavBar() {
  return (
    <nav className="app-nav" aria-label="Principal">
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
