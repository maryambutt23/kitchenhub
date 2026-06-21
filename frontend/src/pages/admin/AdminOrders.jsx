import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const getToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken")
    );
  };


  // ================= FETCH ORDERS =================

  const fetchOrders = useCallback(async () => {

    try {

      const token = getToken();

      console.log("ADMIN TOKEN:", token);


      const res = await axios.get(
        "https://kitchenhub--maryambutt23.replit.app/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setOrders(res.data);


    } catch (err) {

      console.log(
        "FETCH ERROR:",
        err.response?.data || err.message
      );

    }

  }, []);



  useEffect(() => {

    fetchOrders();

  }, [fetchOrders]);




  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {

    try {

      const token = getToken();


      await axios.put(

        `https://kitchenhub--maryambutt23.replit.app/api/orders/${id}`,

        {
          status
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchOrders();


    } catch(err){

      console.log(
        "UPDATE ERROR:",
        err.response?.data || err.message
      );

    }

  };




  // ================= DELETE ORDER =================

  const deleteOrder = async (id)=>{

    try{

      const token = getToken();


      await axios.delete(

        `https://kitchenhub--maryambutt23.replit.app/api/orders/${id}`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchOrders();


    }catch(err){

      console.log(
        "DELETE ERROR:",
        err.response?.data || err.message
      );

    }

  };





  return (

    <div
      style={{
        padding:"20px",
        color:"#fff"
      }}
    >


      <h2 style={{color:"#d4af37"}}>
        📦 Admin Orders
      </h2>



      {
        orders.length === 0 ?

        (
          <p>No orders found</p>
        )

        :

        (

        orders.map((order)=>(


          <div

            key={order._id}

            style={{
              background:"#1a1a1a",
              padding:"15px",
              marginBottom:"15px",
              borderRadius:"10px"
            }}

          >


            <h3>
              {order.customerName}
            </h3>


            <p>
              📞 {order.phone}
            </p>


            <p>
              📍 {order.address}
            </p>


            <p>
              💰 Total: Rs {order.totalPrice}
            </p>



            <span style={{color:"orange"}}>
              {order.status}
            </span>




            {/* PRODUCTS */}

            <div style={{marginTop:"10px"}}>


            {
              order.products?.map((item,index)=>(


                <div

                  key={index}

                  style={{
                    display:"flex",
                    gap:"10px",
                    background:"#111",
                    padding:"10px",
                    borderRadius:"8px",
                    marginTop:"8px"
                  }}

                >



                  <img

                    src={item.image}

                    alt={item.name}

                    style={{
                      width:"60px",
                      height:"60px",
                      objectFit:"cover",
                      borderRadius:"6px"
                    }}

                  />



                  <div>


                    <p>
                      <b>{item.name}</b>
                    </p>


                    <p>
                      Qty: {item.quantity}
                    </p>


                    <p>
                      Price: Rs {item.price}
                    </p>


                  </div>



                </div>


              ))

            }


            </div>




            {/* BUTTONS */}


            <div style={{marginTop:"10px"}}>


              <button
                onClick={()=>setSelectedOrder(order)}
              >
                View
              </button>



              <button

                onClick={()=>
                  updateStatus(order._id,"Pending")
                }

              >
                Pending
              </button>




              <button

                onClick={()=>
                  updateStatus(order._id,"Delivered")
                }

              >
                Deliver
              </button>





              <button

                onClick={()=>
                  deleteOrder(order._id)
                }

                style={{
                  color:"red"
                }}

              >
                Delete
              </button>



            </div>




          </div>


        ))

        )

      }






      {/* POPUP */}


      {
        selectedOrder &&

        (

        <div

          style={{
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            background:"rgba(0,0,0,0.7)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}

        >


          <div

            style={{
              background:"#1a1a1a",
              padding:"20px",
              borderRadius:"10px",
              width:"400px",
              color:"#fff"
            }}

          >


            <h2 style={{color:"#d4af37"}}>
              Order Details
            </h2>



            <p>
              <b>Name:</b> {selectedOrder.customerName}
            </p>


            <p>
              <b>Phone:</b> {selectedOrder.phone}
            </p>


            <p>
              <b>Address:</b> {selectedOrder.address}
            </p>


            <p>
              <b>Total:</b> Rs {selectedOrder.totalPrice}
            </p>


            <p>
              <b>Status:</b> {selectedOrder.status}
            </p>



            <button

              onClick={()=>
                setSelectedOrder(null)
              }

            >

              Close

            </button>



          </div>


        </div>

        )

      }



    </div>

  );

}