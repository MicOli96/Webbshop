import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const cartItemsAtom = atomWithStorage<CartItem[]>("cart", []);
export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.price * i.quantity, 0),
);
export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.quantity, 0),
);

export const addItemAtom = atom(null, (get, set, newItem: CartItem) => {
  const items = get(cartItemsAtom);
  const existing = items.find((i) => i.productId === newItem.productId);
  set(
    cartItemsAtom,
    existing
      ? items.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i,
        )
      : [...items, newItem],
  );
});

export const updateQuantityAtom = atom(
  null,
  (
    get,
    set,
    { productId, quantity }: { productId: string; quantity: number },
  ) => {
    const items = get(cartItemsAtom);
    set(
      cartItemsAtom,
      quantity <= 0
        ? items.filter((i) => i.productId !== productId)
        : items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
    );
  },
);

export const removeItemAtom = atom(null, (get, set, productId: string) => {
  set(
    cartItemsAtom,
    get(cartItemsAtom).filter((i) => i.productId !== productId),
  );
});

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
};
