import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/jobModel.js";
dotenv.config();

// ⚠️ REPLACE THIS with your actual userId from MongoDB (check your login response)
const USER_ID = process.argv[2];

if (!USER_ID) {
    console.log("❌ Usage: node Backend/seed.js <YOUR_USER_ID>");
    console.log("   Example: node Backend/seed.js 661a1b2c3d4e5f6789012345");
    process.exit(1);
}

const sampleJobs = [
    { title: "Frontend Developer", company: "Google", status: "Applied", location: "Bangalore", salary: 1800000, jobLinks: "https://careers.google.com/1", notes: "Referred by friend" },
    { title: "Backend Developer", company: "Microsoft", status: "Interview", location: "Hyderabad", salary: 2000000, jobLinks: "https://careers.microsoft.com/1", notes: "Phone screen done" },
    { title: "Full Stack Developer", company: "Amazon", status: "Applied", location: "Chennai", salary: 2200000, jobLinks: "https://amazon.jobs/1", notes: "Applied via LinkedIn" },
    { title: "SDE Intern", company: "Flipkart", status: "Offered", location: "Bangalore", salary: 800000, jobLinks: "https://flipkart.com/careers/1", notes: "Got offer letter!" },
    { title: "React Developer", company: "Swiggy", status: "Rejected", location: "Bangalore", salary: 1500000, jobLinks: "https://swiggy.com/careers/1", notes: "Failed DSA round" },
    { title: "Node.js Developer", company: "Zomato", status: "Interview", location: "Delhi", salary: 1400000, jobLinks: "https://zomato.com/careers/1", notes: "System design round next" },
    { title: "Software Engineer", company: "TCS", status: "Applied", location: "Mumbai", salary: 700000, jobLinks: "https://tcs.com/careers/1", notes: "Campus placement" },
    { title: "DevOps Engineer", company: "Infosys", status: "Applied", location: "Pune", salary: 900000, jobLinks: "https://infosys.com/careers/1", notes: "Applied through portal" },
    { title: "Data Analyst", company: "Wipro", status: "Rejected", location: "Hyderabad", salary: 600000, jobLinks: "https://wipro.com/careers/1", notes: "No response after 2 weeks" },
    { title: "ML Engineer", company: "Google", status: "Interview", location: "Bangalore", salary: 2500000, jobLinks: "https://careers.google.com/2", notes: "ML coding round pending" },
    { title: "Mobile Developer", company: "PhonePe", status: "Applied", location: "Bangalore", salary: 1600000, jobLinks: "https://phonepe.com/careers/1", notes: "React Native role" },
    { title: "Cloud Engineer", company: "AWS", status: "Offered", location: "Hyderabad", salary: 2100000, jobLinks: "https://aws.amazon.com/careers/1", notes: "Accepted offer" },
    { title: "QA Engineer", company: "Razorpay", status: "Applied", location: "Bangalore", salary: 1200000, jobLinks: "https://razorpay.com/careers/1", notes: "Automation testing role" },
    { title: "UI/UX Designer", company: "CRED", status: "Interview", location: "Bangalore", salary: 1800000, jobLinks: "https://cred.club/careers/1", notes: "Portfolio review done" },
    { title: "Python Developer", company: "Freshworks", status: "Applied", location: "Chennai", salary: 1100000, jobLinks: "https://freshworks.com/careers/1", notes: "Django backend role" },
    { title: "Java Developer", company: "Cognizant", status: "Rejected", location: "Chennai", salary: 800000, jobLinks: "https://cognizant.com/careers/1", notes: "Didn't clear aptitude" },
    { title: "Angular Developer", company: "Zoho", status: "Applied", location: "Chennai", salary: 1000000, jobLinks: "https://zoho.com/careers/1", notes: "Walk-in interview" },
    { title: "Blockchain Developer", company: "Polygon", status: "Interview", location: "Remote", salary: 3000000, jobLinks: "https://polygon.technology/careers/1", notes: "Smart contract round" },
    { title: "Security Engineer", company: "Paytm", status: "Applied", location: "Noida", salary: 1300000, jobLinks: "https://paytm.com/careers/1", notes: "Cybersecurity role" },
    { title: "SRE Engineer", company: "Uber", status: "Interview", location: "Hyderabad", salary: 2400000, jobLinks: "https://uber.com/careers/1", notes: "On-call rotation discussed" },
];

const seedJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ DB Connected");

        const jobsWithUser = sampleJobs.map(job => ({
            ...job,
            userId: USER_ID,
        }));

        await Job.insertMany(jobsWithUser);
        console.log(`✅ ${sampleJobs.length} jobs inserted successfully!`);

        await mongoose.disconnect();
        console.log("✅ DB Disconnected");
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

seedJobs();
