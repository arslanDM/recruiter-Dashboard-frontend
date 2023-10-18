import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required("Email Required"),
  password: Yup.string().required("Password Required"),
});

export const staffSchema = Yup.object({
  email: Yup.string().required("Email Required"),
  password: Yup.string().required("Password Required"),
  jobDescription:Yup.string().required("Job Description required"),
  role: Yup.string().required(),
});

export const candidateSchema = Yup.object({
  email: Yup.string().required("Email Required"),
  name: Yup.string().required("Name Required"),
  skillSet: Yup.string().required("Skills Required"),
  phoneNumber: Yup.string().required("Phone Required"),
  cv: Yup.mixed().required("CV Required"),
  organization: Yup.string().required("Organization Required"),
  jobTitle: Yup.string().required("Job title Required"),
  experience: Yup.string().required("Experience  Required"),
  country: Yup.string().required("Country  Required"),
  city: Yup.string().required("City  Required"),
  personalAddress: Yup.string().required("Personal address Required"),
  status: Yup.string().required("Status  Required"),
});

export const employerSchema = Yup.object({
  email: Yup.string().required("Email Required"),
  name: Yup.string().required("Name Required"),
  jobDescription: Yup.string().required("Job description Required"),
  date: Yup.date().required("Date  Required"),
  // timeSlots: Yup.array().of(
  //   Yup.object().shape({
  //     date: Yup.date().required("Date  required"),
  //     startTime: Yup.string().required("start time required"),
  //     endTime: Yup.string().required("end time required"),
  //     timeZone: Yup.string().required("Time zone required"),
  //   })
  // ),
});

export const slotSchema = Yup.object({
  startTime: Yup.string().required("Start time required"),
  endTime: Yup.string().required("End time required"),
  timeZone: Yup.string().required("Time zone required"),
  status: Yup.string().required("Status required"),
});
