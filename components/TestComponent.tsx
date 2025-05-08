"use client";
import { useEffect } from "react";

const TestComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://buzfi.winmarkbd.com/api/v3/banners/hero"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data);
        // Process your JSON data here
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };

    fetchData();
    console.log("Calling API!");
  }, []);

  return <div>TestComponent</div>;
};

export default TestComponent;
