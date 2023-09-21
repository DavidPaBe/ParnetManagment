import { GearApi } from "@gear-js/api";
import { Button, Input } from "@gear-js/ui";
import { useState } from "react";

function GetTimestamp() {
  const [blockhash, setBlockhash] = useState<any | undefined>(0);
  const [timestamp, setTimestamp] = useState<any | undefined>(0);
  const [year, setYear] = useState<any | undefined>(0);
  const [month, setMonth] = useState<any | undefined>(0);
  const [minutes, setMinutes] = useState<any | undefined>(0);
  const [seconds, setSeconds] = useState<any | undefined>(0);
  const [hour, setHour] = useState<any | undefined>(0);
  const [day, setDay] = useState<any | undefined>(0);

  const subscribeblocks = async () => {
    const gearApi = await GearApi.create({
      providerAddress:"wss://testnet.vara.rs",
    });

    await gearApi.gearEvents.subscribeToNewBlocks((header: any) => {
      console.log(
        `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`
      );
    });
  };

  const getTimestamp = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://testnet.vara.rs"
      ,
    });

    const ts = await gearApi.blocks.getBlockTimestamp(blockhash);
    setTimestamp(ts.toNumber());

    const fecha = new Date(ts.toNumber());
    setYear(fecha.getFullYear());
    setMonth(fecha.getMonth() + 1);
    setDay(fecha.getDate());
    setHour(fecha.getHours());
    setMinutes(fecha.getMinutes());
    setSeconds(fecha.getSeconds());
  };

  const AmountInputChange = async (event: any) => {
    setBlockhash(event.target.value);
  };

  return (

    <div>
      <div className="card">
        <center>Get Timestamp</center>
        <Input type="text" value={blockhash} onChange={AmountInputChange} />
        <div className="horizontal">
          <Button text="Subscribe blocks" onClick={subscribeblocks} />
          <Button text="Get Timestamp" onClick={getTimestamp} />
        </div>
      </div>
      <div className="card">
        <center>Output</center>
        <center>Timestamp: {timestamp}</center>
        <center>Year: {year}</center>
        <center>Month: {month}</center>
        <center>Day: {day}</center>
        <center>Hour: {hour}</center>
        <center>Minutes: {minutes}</center>
        <center>Seconds: {seconds}</center>
      </div>
      </div>
  );
}

export { GetTimestamp };
