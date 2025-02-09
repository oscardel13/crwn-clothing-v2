import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as  CrwnLogo} from "../../assets/crown.svg";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, NavLink, NavLinksCotainer, LogoContainer } from './navigation.styles';
import { signOutStart } from "../../store/user/user.reducer";

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = () => dispatch(signOutStart())
    return (
      <Fragment>
        <NavigationContainer>
              <LogoContainer to="/">
                <CrwnLogo/>
              </LogoContainer>
              <NavLinksCotainer>
                  <NavLink to='/shop'>SHOP</NavLink>
                  { currentUser ? (
                    <NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>
                  ) : (
                    <NavLink to='/auth'>SIGN IN</NavLink>
                  )}         
                  <CartIcon/>  
              </NavLinksCotainer>
              { isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
  }

export default Navigation