"use client";

import { useEffect, useState } from "react";
import { TestResponse } from "@/models/test";
import { getTest } from "@/api/test";
import Button from "@/components/button/Button";

const Test = () => {
  const [data, setData] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestData = () => {
    setLoading(true);
    getTest()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {loading ? (
        <div className="font-medium text-lg">Loading...</div>
      ) : data ? (
        <pre>{JSON.stringify(data)}</pre>
      ) : (
        <div className="font-medium text-lg">Empty :(</div>
      )}
      <Button className="mt-4" onClick={() => requestData()}>
        Запросить данные
      </Button>
    </div>
  );
};

export default Test;
