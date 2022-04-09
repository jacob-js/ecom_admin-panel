import React, { createContext, useCallback, useState } from "react";
import OrderDetails from "../Subs/OrderDetails";
import OrdersContent from "../Subs/OrdersContent";

export const OrdersContext = createContext({});

export default function Orders() {
    const [activeTab, setActiveTab] = useState("all");
    const [currentOrder, setCurrentOrder] = useState({});

    const changeTab = useCallback(
        () => {
            setActiveTab(activeTab === "all" ? "details" : "all");
        }
    );
    const changeOrder = useCallback(
        (order) => { setCurrentOrder(order) }
    );
    return(
        <OrdersContext.Provider value={{
            activeTab,
            changeTab,
            currentOrder,
            changeOrder
        }}>
            {
                activeTab === "all" ? <OrdersContent /> : <OrderDetails />
            }
        </OrdersContext.Provider>
    )
}