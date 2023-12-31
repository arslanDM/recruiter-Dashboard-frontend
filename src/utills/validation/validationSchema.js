import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email Required"),
  password: Yup.string().required("Password Required"),
});

export const staffSchema = Yup.object({
  email: Yup.string().required("Email Required"),
  password: Yup.string().required("Password Required"),
  role: Yup.string().required(),
});

export const candidateSchema = Yup.object({
  email: Yup.string().required("Email Required"),
  name: Yup.string().required("Name Required"),
  skillSet: Yup.string().required("Skills Required"),
  phoneNumber: Yup.string()
    .min(6, "Phone must be 8 digits")
    .required("Phone Required"),
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
});

export const jobsSchema = Yup.object().shape({
  jobDescription: Yup.string().required("Job description required"),
  employer: Yup.string().required("Employer required"),
  dates: Yup.array().of(
    Yup.object().shape({
      date: Yup.string().required("Date is required"),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
      timeZone: Yup.string().required("Time zone is required"),
    })
  ),
});

export const interviewSchema = Yup.object({
  candidateId: Yup.string().required("Candidate is required"),
  employerId: Yup.string().required("Employer is required"),
  selectedSlot: Yup.string().required("Time slot is required"),
  date: Yup.string().required("Date is required"),
  interviewLink: Yup.string().required("Interview link is required"),
});

export const feedbackSchema = Yup.object({
  candidate: Yup.string().required("Status is required"),
  status: Yup.string().required("Status is required"),
  remarks: Yup.string().required("Remarks is required"),
  date: Yup.string().when("status", (status) => {
    if (status == "reschedule") {
      return Yup.string().required("Date is required");
    } else {
      return Yup.string().nullable();
    }
  }),
  startTime: Yup.string().when("status", (status) => {
    if (status == "reschedule") {
      return Yup.string().required("Start time is required");
    } else {
      return Yup.string().nullable();
    }
  }),
  endTime: Yup.string().when("status", (status) => {
    if (status == "reschedule") {
      return Yup.string().required("end time is required");
    } else {
      return Yup.string().nullable();
    }
  }),
  timeZone: Yup.string().when("status", (status) => {
    if (status == "reschedule") {
      return Yup.string().required("Time zone is required");
    } else {
      return Yup.string().nullable();
    }
  }),
});
