import axios from "axios"

export async function fetchAllOrders(req, res) {
    const { accessToken } = req.body;
    let allOrders = []; // Array to store all orders
    let nextPageToken = null; // Pagination token
    let hasMore = true; // Flag to check if more orders are available

    try {
        while (hasMore) {
            // Construct the URL with the nextPageToken (if available)
            let url = 'https://api.flipkart.net/sellers/v3/orders';
            if (nextPageToken) {
                url += `?nextPageToken=${nextPageToken}`;
            }

            // Fetch orders for the current page
            const response = await axios.post(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            // Add the fetched orders to the allOrders array
            if (response.data?.orders) {
                allOrders = allOrders.concat(response.data.orders);
            }

            // Check if there are more orders to fetch
            if (response.data?.nextPageToken) {
                nextPageToken = response.data.nextPageToken;
            } else {
                hasMore = false; // No more orders to fetch
            }
        }

        // Return all orders
        res.status(200).json({
            success: true,
            data: allOrders,
        });
    } catch (error) {
        console.error('Error fetching all orders:', error.response?.data || error.message);

        // If the error is due to no orders, return an empty array
        if (error.response?.status === 404) {
            return res.status(200).json({
                success: true,
                data: [],
            });
        }

        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to fetch all orders' },
        });
    }
}
// export async function searchShipments(req, res) {
//     const { accessToken, filters } = req.body;

//     const url = 'https://api.flipkart.net/sellers/v3/shipments/filter';

//     try {
//         const response = await axios.post(url, filters, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//         });
// console.log(response,"res")
//         res.status(200).json({
//             success: true,
//             data: response.data,
//         });
//     } catch (error) {
//         console.error('Error searching shipments:', error.response?.data || error.message);
//         res.status(500).json({
//             success: false,
//             error: error.response?.data || { message: 'Failed to search shipments' },
//         });
//     }
// }




export async function searchShipments(req, res) {
    const { accessToken, filters } = req.body;

    // Construct the payload based on the API requirements
    const payload = {
        filter: {
            type: filters.type || "preDispatch", // Mandatory: preDispatch, postDispatch, or cancelled
            states: filters.states || ["APPROVED", "PACKED"], // Mandatory: List of shipment states
            sku: filters.sku ? [filters.sku] : undefined, // Optional: Filter by SKU
            orderDate: filters.orderDate || { // Optional: Filter by order date range
                from: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(), // Last 2 months
                to: new Date().toISOString(), // Current date
            },
            // Add other optional filters as needed
        },
        pagination: {
            pageSize: 20, // Optional: Number of results per page (max 20)
        },
        sort: {
            field: "dispatchByDate", // Optional: Sort by dispatchByDate
            order: "desc", // Optional: Sort order (asc or desc)
        },
    };

    // Log the payload for debugging
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const url = 'https://api.flipkart.net/sellers/v3/shipments/filter';

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error searching shipments:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to search shipments' },
        });
    }
}
export async function getShipmentDetails(req, res) {
    const { accessToken, shipmentIds, orderItemIds, orderIds } = req.body;

    let url = 'https://api.flipkart.net/sellers/v3/shipments?';

    if (shipmentIds) {
        url += `shipmentIds=${shipmentIds}`;
    } else if (orderItemIds) {
        url += `orderItemIds=${orderItemIds}`;
    } else if (orderIds) {
        url += `orderIds=${orderIds}`;
    } else {
        return res.status(400).json({
            success: false,
            error: 'shipmentIds, orderItemIds, or orderIds is required',
        });
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error fetching shipment details:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to fetch shipment details' },
        });
    }
}

export async function generateLabels(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = 'https://api.flipkart.net/sellers/v3/shipments/labels';

    try {
        const response = await axios.post(url, { shipmentIds }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error generating labels:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to generate labels' },
        });
    }
}

export async function printShippingLabels(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = `https://api.flipkart.net/sellers/v3/shipments/${shipmentIds}/labels`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error printing shipping labels:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to print shipping labels' },
        });
    }
}

export async function downloadLabelsPDF(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = `https://api.flipkart.net/sellers/v3/shipments/${shipmentIds}/labelOnly/pdf`;

    try {
        const response = await axios.post(url, null, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error downloading labels (PDF):', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to download labels (PDF)' },
        });
    }
}

export async function markReadyToDispatch(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = 'https://api.flipkart.net/sellers/v3/shipments/dispatch';

    try {
        const response = await axios.post(url, { shipmentIds }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error marking shipments as ready to dispatch:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to mark shipments as ready to dispatch' },
        });
    }
}

export async function getShipmentInfo(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = `https://api.flipkart.net/sellers/v3/shipments/${shipmentIds}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error fetching shipment information:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to fetch shipment information' },
        });
    }
}

export async function getInvoiceInfo(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = `https://api.flipkart.net/sellers/v3/shipments/${shipmentIds}/invoices`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error fetching invoice information:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to fetch invoice information' },
        });
    }
}

export async function cancelShipment(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = 'https://api.flipkart.net/sellers/v3/shipments/cancel';

    try {
        const response = await axios.post(url, { shipmentIds }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error canceling shipment:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to cancel shipment' },
        });
    }
}

export async function getShipmentForms(req, res) {
    const { accessToken, shipmentIds } = req.body;

    const url = `https://api.flipkart.net/sellers/v3/shipments/${shipmentIds}/forms`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error fetching shipment forms:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to fetch shipment forms' },
        });
    }
}

