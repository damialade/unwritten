"use client";
import "./styles/global.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  id: number;
  customerName: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  status: string;
}

const Home = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/customer.json");
        setCustomers(response.data);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container">
      <h1>Customer List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              <h3>{customer.customerName}</h3>
              <p>Email: {customer.email}</p>
              <p>Gender: {customer.gender}</p>
              <p>Phone: {customer.phone}</p>
              <p>Address: {customer.address}</p>
              <p>Status: {customer.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
