import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../media/logos/logo.png";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

/* ----------------- CART CONTEXT ----------------- */
const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

/* ----------------- STYLED COMPONENTS ----------------- */
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #baa78c;
  margin: 0.2rem 0;
  opacity: 0.5;
`;

const Nav = styled.nav`
  background: #4e4539ff;
  padding: 0rem 0.5rem;
  border-bottom: 6px solid #43533dff;
  position: sticky;
  top: 0;
  z-index: 100;
  color: #baa78cff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-left: 1rem;
`;

const Brand = styled.b`
  margin-right: 7rem;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 5rem;
`;

const RightWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.5rem;
  position: relative;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  left: 0;
  background: #3f382eff;
  padding: 0.3rem;
  border-radius: 8px;
  z-index: 1000;

  a {
    display: block;
    padding: 0.5rem;
    color: #fff;
    text-decoration: none;
    &:hover {
      background: #614b3461;
      color: #fff;
    }
    &.active {
      box-shadow: none;
      color: #c49a6c;
      font-size: 1.6rem;
    }
  }
`;

const AccountDropdownMenu = styled(DropdownMenu)`
  width: 10rem;
  left: auto;
  right: 0;
  transform: translateX(-40%);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 12rem;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  color: #baa78cff;
  text-decoration: none;
  padding: 0 1rem;

  &.text {
    height: auto;
    width: auto;
  }

  &.active {
    box-shadow: inset 0 -6px 0 #cfbca6ff;
    color: #c49a6c;
    font-size: 1.6rem;
  }

  &:hover {
    background-color: #614b34ff;
    color: #c49a6c;
  }
`;

const StyledNavLinkRight = styled(NavLink)`
  background: none;
  border: none;
  font-size: 2.3rem;
  cursor: pointer;
  color: #baa78cff;
  padding: 0 0.5rem;

  &.text {
    font-size: 1.6rem;
    font: inherit;
  }
  &.text:hover {
    color: #c49a6c;
    font-size: 1.6rem;
  }

  &:hover {
    font-size: 2.8rem;
    color: #c49a6c;
  }
`;

/* ----------------- BUMP ANIMATION ----------------- */

const IconWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CartBadge = styled(motion.span)`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #c49a6c;     /* gold */
  color: #2b241d;          /* dark text */
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  box-shadow: 0 2px 6px rgba(0,0,0,.35);
  border: 1px solid #2b241d30;
`;

/* ----------------- CART POPUP ----------------- */
const CartPopup = styled(motion.div)`
  position: absolute;
  top: 4rem;
  right: 0;
  background: #3f382eff;
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
  max-height: 320px;
  overflow-y: auto;
  z-index: 1000;
  color: #fff;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

const CheckoutButton = styled(NavLink)`
  display: block;
  width: 100%;
  margin-top: 1rem;
  padding: 0.7rem 0;
  background: #c49a6c;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
  &:hover {
    background: #614b34;
    color: #fff;
  }
`;

/* ----------------- NAVBAR ----------------- */
const NavbarExample = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cartItems, removeItem } = useCart();
  const totalQty = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
  const { user, logout, isAuthed } = useAuth();
  const cartRef = useRef(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };
    if (openCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCart]);

  return (
    <Nav>
      <Logo src={logo} alt="Bean & Brew Logo" />
      <Brand>Bean & Brew</Brand>
      <Wrapper>
        <StyledNavLink to="/" onClick={() => setOpenProducts(false)}>
          Home
        </StyledNavLink>

        {/* PRODUCTS */}
        <DropdownContainer
          onPointerOver={() => setOpenProducts(true)}
          onPointerLeave={() => setOpenProducts(false)}
        >
          <StyledNavLink as="div">Products ▼</StyledNavLink>
          <AnimatePresence>
            {openProducts && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <StyledNavLink className="text" to="/coffee">
                  Coffee
                </StyledNavLink>
                <Divider />
                <StyledNavLink className="text" to="/baked-goods">
                  Baked Goods
                </StyledNavLink>
                <Divider />
                <StyledNavLink className="text" to="/custom-hamper">
                  Customisable Hamper
                </StyledNavLink>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>

        {/* BOOKING */}
        <DropdownContainer
          onPointerOver={() => setOpenBooking(true)}
          onPointerLeave={() => setOpenBooking(false)}
        >
          <StyledNavLink as="div">Booking ▼</StyledNavLink>
          <AnimatePresence>
            {openBooking && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <StyledNavLink className="text" to="/baking-lessons">
                  Baking Lessons
                </StyledNavLink>
                <Divider />
                <StyledNavLink className="text" to="/restaurants">
                  Restaurant Reservations
                </StyledNavLink>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>
      </Wrapper>

      {/* RIGHT ICONS */}
      <RightWrapper>
        {/* CART */}
        <DropdownContainer ref={cartRef}>
          <StyledNavLinkRight as="div" onClick={() => setOpenCart(!openCart)}>
            <IconWrap as={motion.div}
              key={`icon-${totalQty}`}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 0.25 }}
            >
              <FiShoppingCart />              
                <CartBadge
                  key={totalQty} // re-animate when count changes
                  initial={{ scale: 0.6, y: -2, opacity: 0 }}
                  animate={{ scale: [0.6, 1.1, 1.0], opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  aria-label={`${totalQty} items in cart`}
                >
                  {totalQty}
                </CartBadge>
            </IconWrap>
          </StyledNavLinkRight>
          <AnimatePresence>
            {openCart && (
              <CartPopup
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cartItems.map((item) => (
                    <CartItem key={item.id}>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>
                        £{(item.price * item.quantity).toFixed(2)}
                        <RemoveButton onClick={() => removeItem(item.id)}>
                          ✕
                        </RemoveButton>
                      </span>
                    </CartItem>
                  ))
                )}
                {cartItems.length > 0 && (
                  <>
                    <Divider />
                    <strong>Subtotal: £{subtotal.toFixed(2)}</strong>
                    <CheckoutButton to="/checkout">
                      Go to Checkout
                    </CheckoutButton>
                  </>
                )}
              </CartPopup>
            )}
          </AnimatePresence>
        </DropdownContainer>

 {/* ACCOUNT / AUTH */}
        <DropdownContainer
          onPointerOver={() => setOpenAccount(true)}
          onPointerLeave={() => setOpenAccount(false)}
        >
          <StyledNavLinkRight as="div">
            <VscAccount />
          </StyledNavLinkRight>

          <AnimatePresence>
            {openAccount && (
              <AccountDropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {!isAuthed ? (
                  <>
                    <StyledNavLinkRight className="text" to="/signin">
                      Sign In
                    </StyledNavLinkRight>
                    <Divider />
                    <StyledNavLinkRight className="text" to="/signup">
                      Sign Up
                    </StyledNavLinkRight>
                  </>
                ) : (
                  <>
                    <div style={{ padding: "0.4rem 0.6rem", color: "#c49a6c" }}>
                      Hello, {user?.name || "Guest"}!
                    </div>
                    <Divider />
                    <StyledNavLinkRight className="text" to="/account">
                      Account
                    </StyledNavLinkRight>
                    <Divider />
                    <StyledNavLinkRight
                      as="button"
                      className="text"
                      onClick={() => {
                        logout();
                        toast("Signed out", { icon: "👋" });
                        setOpenAccount(false);
                      }}
                      style={{ background: "none", border: 0, cursor: "pointer" }}
                    >
                      Sign Out
                    </StyledNavLinkRight>
                  </>
                )}
              </AccountDropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>
      </RightWrapper>
    </Nav>
  );
};

export default NavbarExample;
