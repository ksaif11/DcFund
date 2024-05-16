"use client";

// import { ethers } from "ethers";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaEthereum } from "react-icons/fa";

// import { ClientButton, FormInput } from "@/components/afterlogin/index";
// import { useEthersContext } from "@/context/EthersContext";
// import { toast } from "react-toastify";

// const Create = () => {
//   const router = useRouter();
//   const { signer, contract, connectWallet } = useEthersContext();

//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     title: "",
//     description: "",
//     imageUrl: "",
//     target: "",
//     deadline: "",
//   });

//   const handleFormInputChange = (field, event) => {
//     setFormValues({ ...formValues, [field]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (
//       !formValues.title ||
//       !formValues.description ||
//       !formValues.imageUrl ||
//       !formValues.target ||
//       !formValues.deadline
//     )
//       return toast.error("Please fill all the fields");

//     if (!signer) return connectWallet();

//     try {
//       setLoading(true);

//       const { title, description, imageUrl } = formValues;
//       const target = ethers.parseEther(formValues.target).toString(); // Corrected method
//       const deadline = new Date(formValues.deadline).getTime();

//       await contract.createCampaign(
//         title,
//         description,
//         imageUrl,
//         target,
//         deadline,
//         { gasLimit: 1000000 },
//       );

//       toast.success("Campaign created successfully.");
//       handleReset();

//       setTimeout(() => {
//         return router.push("/afterlogin/account");
//       }, 2000);
//     } catch (error) {
//       toast.error("Campaign couldn't be created.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormValues({
//       title: "",
//       description: "",
//       imageUrl: "",
//       target: "",
//       deadline: "",
//     });
//   };

//   return (
//     <main className="bg-neutral-800 min-h-[calc(100vh-96px)] w-full rounded-lg">
//       <div className="w-content m-auto flex items-center justify-center p-4">
//         <h1 className="bg-neutral-700 w-content mx-auto rounded-lg px-8 py-4 text-center text-2xl font-semibold">
//           Start a Campaign
//         </h1>
//       </div>
//       <form
//         className="flex min-h-[calc(100vh-192px)] flex-col gap-4 p-4"
//         onSubmit={handleSubmit}
//       >
//         <div className="flex flex-col gap-4 md:flex-row">
//           <FormInput
//             label={"Campaign Title"}
//             placeholder={"Write a title..."}
//             type={"text"}
//             value={formValues.title}
//             onChange={(e) => handleFormInputChange("title", e)}
//           />
//           <FormInput
//             label={"Image URL"}
//             placeholder={"Paste campaign image URL here..."}
//             type={"text"}
//             value={formValues.imageUrl}
//             onChange={(e) => handleFormInputChange("imageUrl", e)}
//           />
//         </div>
//         <FormInput
//           label={"Story"}
//           placeholder={"Write why you need this money..."}
//           type={"textarea"}
//           value={formValues.description}
//           onChange={(e) => handleFormInputChange("description", e)}
//         />
//         <div className="bg-emerald-500 text-emerald-300 flex items-center justify-around gap-4 rounded-lg p-4 md:p-8">
//           <FaEthereum className="text-5xl" />
//           <span className="text-lg font-semibold sm:text-xl md:text-2xl">
//             You will get 99% of the raised amount
//           </span>
//           <FaEthereum className="text-5xl" />
//         </div>
//         <div className="flex flex-col gap-4 md:flex-row">
//           <FormInput
//             label={"Goal (ETH)"}
//             placeholder={"Write your goal amount..."}
//             type={"number"}
//             value={formValues.target}
//             onChange={(e) => handleFormInputChange("target", e)}
//           />
//           <FormInput
//             label={"Deadline"}
//             placeholder={"Pick a deadline..."}
//             type={"date"}
//             value={formValues.deadline}
//             onChange={(e) => handleFormInputChange("deadline", e)}
//           />
//         </div>
//         <div className="mt-auto flex justify-end gap-4">
//           <ClientButton
//             loading={loading}
//             className="bg-emerald-500 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 w-28 rounded-lg border-2 p-3 font-semibold transition-all duration-200"
//             onClick={handleSubmit}
//           >
//             Create
//           </ClientButton>
//           <ClientButton
//             className="text-emerald-500 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 w-28 rounded-lg border-2 bg-transparent p-3 font-semibold transition-all duration-200 hover:text-white"
//             onClick={handleReset}
//           >
//             Reset
//           </ClientButton>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default Create;
// Create.js

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";
import { ClientButton, FormInput } from "@/components/afterlogin/index";
import { useEthersContext } from "@/context/EthersContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const Create = () => {
  const router = useRouter();
  const { signer, contract, connectWallet } = useEthersContext();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    imageUrl: "",
    target: "",
    deadline: "",
  });

  const handleFormInputChange = (field, event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, imageUrl, target, deadline } = formValues;

    if (!title || !description || !imageUrl || !target || !deadline) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!signer) {
      connectWallet();
      return;
    }

    try {
      setLoading(true);

      const parsedTarget = ethers.parseEther(target).toString();
      const parsedDeadline = new Date(deadline).getTime();

      await contract.createCampaign(
        title,
        description,
        imageUrl,
        parsedTarget,
        parsedDeadline,
        { gasLimit: 1000000 },
      );

      toast.success("Campaign created successfully.");
      handleReset();

      setTimeout(() => {
        router.push("/afterlogin/account");
      }, 2000);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Campaign couldn't be created.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      title: "",
      description: "",
      imageUrl: "",
      target: "",
      deadline: "",
    });
  };

  return (
    <main className="bg-neutral-800 min-h-[calc(100vh-96px)] w-full rounded-lg">
      <div className="w-content m-auto flex items-center justify-center p-4">
        <h1 className="bg-neutral-700 w-content mx-auto rounded-lg px-8 py-4 text-center text-2xl font-semibold">
          Start a Campaign
        </h1>
      </div>
      <form
        className="flex min-h-[calc(100vh-192px)] flex-col gap-4 p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <FormInput
            label={"Campaign Title"}
            placeholder={"Write a title..."}
            type={"text"}
            value={formValues.title}
            onChange={(e) => handleFormInputChange("title", e)}
          />
          <FormInput
            label={"Image URL"}
            placeholder={"Paste campaign image URL here..."}
            type={"text"}
            value={formValues.imageUrl}
            onChange={(e) => handleFormInputChange("imageUrl", e)}
          />
        </div>
        <FormInput
          label={"Story"}
          placeholder={"Write why you need this money..."}
          type={"textarea"}
          value={formValues.description}
          onChange={(e) => handleFormInputChange("description", e)}
        />
        <div className="flex flex-col gap-4 md:flex-row">
          <FormInput
            label={"Goal (ETH)"}
            placeholder={"Write your goal amount..."}
            type={"number"}
            value={formValues.target}
            onChange={(e) => handleFormInputChange("target", e)}
          />
          <FormInput
            label={"Deadline"}
            placeholder={"Pick a deadline..."}
            type={"date"}
            value={formValues.deadline}
            onChange={(e) => handleFormInputChange("deadline", e)}
          />
        </div>
        <div className="mt-auto flex justify-end gap-4">
          <ClientButton
            loading={loading}
            className="bg-emerald-500 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 w-28 rounded-lg border-2 p-3 font-semibold transition-all duration-200"
            onClick={handleSubmit}
          >
            Create
          </ClientButton>
          <ClientButton
            className="text-emerald-500 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 w-28 rounded-lg border-2 bg-transparent p-3 font-semibold transition-all duration-200 hover:text-white"
            onClick={handleReset}
          >
            Reset
          </ClientButton>
        </div>
      </form>
    </main>
  );
};

export default Create;
