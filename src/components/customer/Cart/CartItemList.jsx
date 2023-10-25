import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackBorder } from './StackBorder';
import BottomTools from './BottomTools';
import checkBoxHandler from '../../../utils/checkBoxHandler';
import { checkChanges } from './checkChanges';
import { updatingCart } from './updatingCart';
import api from '../../../constants/api';
import { CartItemImage } from './CartItemImage';
import { CartItemTitle } from './CartItemTitle';

export function CartItemList({ cart, product, address }) {
  const [quantity, setQuantity] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [note, setNote] = useState('');
  const { stock } = product;
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.authUser);

  const editQuantity = async (number) => {
    setQuantity(quantity + number);
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    checkBoxHandler(`cart-item-checkboxes`, `check-all-products`);
  };

  const handleChangeQuantity = (e) => {
    if (Number(e.target.value) < 2) return setQuantity(1);
    if (Number(e.target.value) > stock) {
      return setQuantity(stock);
    }
    return setQuantity(e.target.value);
  };

  useEffect(() => {
    setQuantity(product?.quantity);
    setIsChecked(product?.isChecked);
    if (product?.note) setNote(product?.note);
  }, [product]);

  useEffect(() => {
    const temp = { ...product };
    temp.quantity = quantity - product.quantity;
    if (checkChanges(isChecked, note, temp)) {
      temp.isChecked = isChecked;
      temp.note = note;
      const updateItem = updatingCart(dispatch, cart, temp, userSelector?.id);
      return () => {
        clearTimeout(updateItem);
      };
    }
  }, [quantity, isChecked, note]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            {window.location.pathname === `/cart` ? (
              <input
                type="checkbox"
                id={`checkbox-${product?.Product?.name}`}
                name="cart-item-checkboxes"
                defaultChecked={product?.isChecked}
                onChange={handleCheck}
              />
            ) : null}
            <div className="d-flex gap-2">
              <CartItemImage product={product} />
              <div className="d-flex flex-column gap-2 flex-grow-1">
                <CartItemTitle product={product} stock={stock} />
                <div>
                  {quantity} item{quantity > 1 ? 's' : null} (
                  {product.Product.weight * quantity} gram)
                </div>
                <div>
                  <b>Rp{product?.Product?.price.toLocaleString(`id-ID`)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={window.location.pathname === '/cart' ? 'my-2' : 'd-none'}>
        <BottomTools
          quantity={quantity}
          handleChangeQuantity={handleChangeQuantity}
          editQuantity={editQuantity}
          stock={stock}
          product={product}
          cart={cart}
          note={note}
          setNote={setNote}
        />
      </div>
      <div
        className={
          window.location.pathname === '/cart/shipment' && product?.note
            ? 'my-2'
            : 'd-none'
        }
        style={{ fontSize: '0.8em' }}
      >
        Note: {product?.note}
      </div>
      <StackBorder />
    </>
  );
}
