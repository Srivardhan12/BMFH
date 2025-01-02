import { useState } from "react";
import uploadIcon from "./assets/upload-icon.jpg";
import axios from "axios";

type VenueData = {
  image: string | null;
  name: string;
  location: string;
  rating: number;
  phoneNumber: string;
};

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisableButton(true)
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: VenueData = {
      image,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: Number(formData.get("rating")),
      phoneNumber: formData.get("phoneNumber") as string,
    };

    // console.log(data);
    // return

    try {
      const response = await axios.post("https://bmfh.medium-blog-clone.workers.dev/add-venue", {
        data,
      });
      setResponseMessage(response.data.msg || "Venue added successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
      setResponseMessage("Failed to add venue. Please try again.");
    }
    setDisableButton(false)
  };

  return (
    <div className="px-32 py-5">
      <h2 className="text-4xl font-semibold">Welcome Admin</h2>
      <form onSubmit={handleSubmit} className="pt-10 flex flex-col">
        <label htmlFor="file-upload">
          <img
            src={image || uploadIcon}
            alt="Uploaded Preview"
            className="h-36 w-fit aspect-auto border mb-5 cursor-pointer"
          />
        </label>
        <input
          required
          className="hidden"
          type="file"
          id="file-upload"
          accept=".jpeg, .png, .jpg, .webp"
          onChange={handleImageUpload}
        />
        <input
          className="border-b border-black w-72 my-3 py-1 px-2 outline-none"
          type="text"
          name="name"
          placeholder="Name of the Venue"
          required
        />
        <input
          className="border-b border-black w-72 my-3 py-1 px-2 outline-none"
          type="text"
          name="location"
          placeholder="Location of the Venue"
          required
        />
        <input
          className="border-b border-black w-72 my-3 py-1 px-2 outline-none"
          type="text"
          name="rating"
          placeholder="Rating"
          required
        />
        <input
          className="border-b border-black w-72 my-3 py-1 px-2 outline-none"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          required
        />
        <button
          disabled={disableButton}
          // type="submit"
          // value="Submit"
          className="w-fit px-2 py-1 bg-blue-400 border border-blue-600 rounded-sm"
        >Submit
          {disableButton ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 ml-3 mb-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg> : ""}
        </button>
      </form>
      {responseMessage && (
        <p className="mt-5 text-green-600 font-semibold">{responseMessage}</p>
      )}
    </div>
  );
}

export default App;
