import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { startLogout } from "../../store/actions/auth"


export const Navbar = () => {
    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div className='navbar navbar-dark text-light bg-dark mb-4'>
            <span className='navbar-brand'>
                &nbsp;{name}
            </span>
            <button
                className='btn btn-outline-danger'
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
