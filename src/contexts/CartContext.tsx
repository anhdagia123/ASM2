import { createContext, useContext, useState } from "react";

// Định nghĩa kiểu dữ liệu cho giỏ hàng
interface CartItem {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  status: "Chờ xác nhận" | "Đang giao" | "Hoàn thành";
}

// Interface của Context
interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  placeOrder: (customerName: string, phone: string, address: string) => void;
  updateOrderStatus: (orderId: string, newStatus: "Chờ xác nhận" | "Đang giao" | "Hoàn thành") => void;
}

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, item];
    });
  };

  // Xóa giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Đặt hàng
  const placeOrder = (customerName: string, phone: string, address: string) => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      customerName,
      phone,
      address,
      items: cart,
      status: "Chờ xác nhận",
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart();
    alert("Đặt hàng thành công!");
  };

  // Cập nhật trạng thái đơn hàng (Admin)
  const updateOrderStatus = (orderId: string, newStatus: "Chờ xác nhận" | "Đang giao" | "Hoàn thành") => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, clearCart, placeOrder, updateOrderStatus }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
