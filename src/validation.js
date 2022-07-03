import { useEffect, useRef, useState, Component } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import axios from "axios";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './style.css'
const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  Po: yup.string().required(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url(),
});
const Vali = () => {
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm({
   resolver: yupResolver(SignupSchema),
 });
 const onSubmit = (data) => {
   console.log(data)
 };

  return (
    <div className="App">
      <center>
        <form onSubmit={handleSubmit(onSubmit)}>
          Name
          <input
            className="form-control w-50"
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          {errors?.firstName?.type ==="required" && (
            <p>Name field is required</p>
          )}
          {errors?.firstName?.type ==="maxLength" && (
            <p>name cannot exceed 20 characters</p>
          )}
          {errors?.firstName?.type ==="pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <br></br>
          <br></br>
          <br></br>
          Phone Number
          <PhoneInput
            {...register("Po")}
            className="PO w-50"
            placeholder="Enter phone number"
          />
          {errors?.Po?.type === "required" && (
            <p>Phone Number is required</p>
          )}
          <br></br>
          <br></br>
          <br></br>
          Age
          <input className="form-control w-50" {...register("age")} />
          {errors.age && (
            <p>You Must be older then 18 and younger then 99 years old</p>
          )}
          <input className="btn btn-outline-primary" type="submit" />
        </form>
      </center>
    </div>
  );
};

export default Vali;
