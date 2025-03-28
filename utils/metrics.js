// export function calculateMetrics(orders, financialEvents, inventorySummaries) {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
  
//     const metrics = {
//       totalEarnings: 0,
//       todayEarnings: 0,
//       totalOrdersDeliveredToday: 0,
//       totalOrdersCancelledToday: 0,
//       totalActiveListings: 0,
//       totalInventoryUnits: 0,
//       averageOrderValue: 0,
//       bestSellingProducts: [],
//     };
  
//     // Calculate order metrics
//     orders.forEach(order => {
//       const orderDate = new Date(order.PurchaseDate);
//       const orderTotal = parseFloat(order.OrderTotal.Amount);
  
//       metrics.totalEarnings += orderTotal;
  
//       if (orderDate >= today) {
//         metrics.todayEarnings += orderTotal;
  
//         if (order.OrderStatus === 'Shipped') {
//           metrics.totalOrdersDeliveredToday++;
//         } else if (order.OrderStatus === 'Canceled') {
//           metrics.totalOrdersCancelledToday++;
//         }
//       }
//     });
  
//     // Calculate financial metrics
//     financialEvents.ShipmentEventList.forEach(event => {
//       const eventDate = new Date(event.PostedDate);
//       if (eventDate >= today) {
//         event.ShipmentItemList.forEach(item => {
//           metrics.todayEarnings += parseFloat(item.ItemChargeList.reduce((sum, charge) => sum + parseFloat(charge.ChargeAmount.Amount), 0));
//         });
//       }
//     });
  
//     // Calculate inventory metrics
//     inventorySummaries.forEach(summary => {
//       metrics.totalActiveListings += summary.asin ? 1 : 0;
//       metrics.totalInventoryUnits += summary.totalQuantity || 0;
//     });
  
//     // Calculate average order value
//     metrics.averageOrderValue = metrics.totalEarnings / orders.length;
  
//     // Calculate best selling products (top 5)
//     const productSales = {};
//     orders.forEach(order => {
//       order.OrderItems.forEach(item => {
//         const asin = item.ASIN;
//         if (!productSales[asin]) {
//           productSales[asin] = { units: 0, revenue: 0 };
//         }
//         productSales[asin].units += item.QuantityOrdered;
//         productSales[asin].revenue += parseFloat(item.ItemPrice.Amount) * item.QuantityOrdered;
//       });
//     });
  
//     metrics.bestSellingProducts = Object.entries(productSales)
//       .sort((a, b) => b[1].revenue - a[1].revenue)
//       .slice(0, 5)
//       .map(([asin, data]) => ({ asin, units: data.units, revenue: data.revenue }));
  
//     return metrics;
//   }



// export function calculateMetrics(orders, financialEvents, inventorySummaries) {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
  
//     const metrics = {
//       totalEarnings: 0,
//       todayEarnings: 0,
//       totalOrdersDeliveredToday: 0,
//       totalOrdersCancelledToday: 0,
//       totalActiveListings: 0,
//       totalInventoryUnits: 0,
//       averageOrderValue: 0,
//       bestSellingProducts: [],
//     };
  
//     // Calculate order metrics
//     orders.forEach(order => {
//       const orderDate = new Date(order.PurchaseDate);
//       const orderTotal = parseFloat(order.OrderTotal.Amount);
  
//       metrics.totalEarnings += orderTotal;
  
//       if (orderDate >= today) {
//         metrics.todayEarnings += orderTotal;
  
//         if (order.OrderStatus === 'Shipped') {
//           metrics.totalOrdersDeliveredToday++;
//         } else if (order.OrderStatus === 'Canceled') {
//           metrics.totalOrdersCancelledToday++;
//         }
//       }
//     });
  
  //   // Calculate financial metrics
  //   financialEvents.ShipmentEventList.forEach(event => {
  //     const eventDate = new Date(event.PostedDate);
  //     if (eventDate >= today) {
  //       event.ShipmentItemList.forEach(item => {
  //         metrics.todayEarnings += parseFloat(item.ItemChargeList.reduce((sum, charge) => sum + parseFloat(charge.ChargeAmount.Amount), 0));
  //       });
  //     }
  //   });
  
  //   // Calculate inventory metrics
  //   inventorySummaries.forEach(summary => {
  //     metrics.totalActiveListings += summary.asin ? 1 : 0;
  //     metrics.totalInventoryUnits += summary.totalQuantity || 0;
  //   });
  
  //   // Calculate average order value
  //   metrics.averageOrderValue = metrics.totalEarnings / orders.length;
  
  //   // Calculate best selling products (top 5)
  //   const productSales = {};
  //   orders.forEach(order => {
  //     order.OrderItems.forEach(item => {
  //       const asin = item.ASIN;
  //       if (!productSales[asin]) {
  //         productSales[asin] = { units: 0, revenue: 0 };
  //       }
  //       productSales[asin].units += item.QuantityOrdered;
  //       productSales[asin].revenue += parseFloat(item.ItemPrice.Amount) * item.QuantityOrdered;
  //     });
  //   });
  
  //   metrics.bestSellingProducts = Object.entries(productSales)
  //     .sort((a, b) => b[1].revenue - a[1].revenue)
  //     .slice(0, 5)
  //     .map(([asin, data]) => ({ asin, units: data.units, revenue: data.revenue }));
  
  //   return metrics;
  // }
  
  




  export function calculateMetrics(orders, financialEvents, inventorySummaries) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const metrics = {
        totalEarnings: 0,
        todayEarnings: 0,
        totalOrdersDeliveredToday: 0,
        totalOrdersCancelledToday: 0,
        totalActiveListings: 0,
        totalInventoryUnits: 0,
        averageOrderValue: 0,
        bestSellingProducts: [],
    };

    // Calculate order metrics
    orders.forEach(order => {
        const orderDate = new Date(order.PurchaseDate);
        const orderTotal = parseFloat(order.OrderTotal.Amount);

        metrics.totalEarnings += orderTotal;

        if (orderDate >= today) {
            metrics.todayEarnings += orderTotal;

            if (order.OrderStatus === 'Shipped') {
                metrics.totalOrdersDeliveredToday++;
            } else if (order.OrderStatus === 'Canceled') {
                metrics.totalOrdersCancelledToday++;
            }
        }
    });

    // Calculate financial metrics
    financialEvents.forEach(event => {
        // Add logic to calculate financial metrics
    });

    // Calculate inventory metrics
    inventorySummaries.forEach(summary => {
        metrics.totalInventoryUnits += summary.totalQuantity;
    });

    // Calculate average order value
    if (orders.length > 0) {
        metrics.averageOrderValue = metrics.totalEarnings / orders.length;
    }

    // Determine best-selling products
    const productSales = {};
    orders.forEach(order => {
        order.OrderItems.forEach(item => {
            const productId = item.SellerSKU;
            if (!productSales[productId]) {
                productSales[productId] = 0;
            }
            productSales[productId] += item.QuantityOrdered;
        });
    });

    metrics.bestSellingProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([productId, quantity]) => ({ productId, quantity }));

    return metrics;
}