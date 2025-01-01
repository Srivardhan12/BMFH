import { useState } from "react";
import uploadIcon from "./assets/upload-icon.jpg";

type VenueData = {
  image: string;
  name: string;
  location: string;
  rating: number;
  phoneNumber: number;
};

function App() {
  const [image, setImage] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: VenueData = {
      image: image || "",
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: Number(formData.get("rating")),
      phoneNumber: Number(formData.get("phoneNumber")),
    };

    console.log("Submitted Data:", data);
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
          accept=".jpeg, .png, .jpg"
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
        <input
          type="submit"
          value="Submit"
          className="w-fit px-2 py-1 bg-blue-400 border border-blue-600 rounded-sm"
        />
      </form>
    </div>
  );
}

export default App;
