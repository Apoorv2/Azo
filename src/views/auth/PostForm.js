import React, { useState, useEffect } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Cookies from "js-cookie";
import OpenAI from "openai";

function PostForm() {
    const storage = getStorage();
    const [file, setFile] = useState(null);
    const [fileDownloadURL, setFileDownloadURL] = useState(null);
    const [textValue, setTextValue] = useState(""); // Input text value
    const [textValue1, setTextValue1] = useState("");


    const handleFileChange = async (e) => {
        // Handle the selected file
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        // Check if FB object exists (from the SDK)
        if (typeof FB !== "undefined") {
            window.FB.init({
                appId: "1000730281143859",
                cookie: true,
                xfbml: true,
                version: "v17.0",
            });
        }
    }, []);

    const handleTextChange = (e) => {
        // Handle changes in the text input
        setTextValue(e.target.value);
    };

    const handleTextChange1 = (e) => {
        // Handle changes in the text input
        setTextValue1(e.target.value);
    };

    useEffect(() => {
        // Upload and get download URL when 'file' changes
        const uploadFile = async () => {
            if (file) {
                const storageRef = ref(storage, file.name);
                await uploadBytes(storageRef, file);

                // Get the download URL of the uploaded file
                const url = await getDownloadURL(storageRef);
                setFileDownloadURL(url); // Update the state with the download URL
            }
        };

        uploadFile(); // Call the function when 'file' changes
    }, [file]);

    const getPageAccessToken = async (userAccessToken, pageId) => {
        try {
            // Make a request to get the user's Pages
            const response = await fetch(`https://graph.facebook.com/v17.0/me/accounts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                },
            });
            const data = await response.json();
            // Find the Page with the specified pageId
            const page = data.data.find((page) => page.id === pageId);

            if (!page) {
                console.error(`Page with ID ${pageId} not found.`);
                return null;
            }
            console.log("page access token: "+ page.access_token)
            // Extract and return the Page access token
            return page.access_token;

        } catch (error) {
            console.error("Error fetching Page access token:", error);
            return null;
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     // Upload the image to Firebase Storage
    //
    //
    //     // Combine the form data
    //     const currentTimeStamp = Timestamp.now();
    //     const date = new Date(currentTimeStamp.seconds * 1000); // Convert seconds to milliseconds
    //
    //     const formData = {
    //         textValue: textValue,
    //         fileDownloadURL: fileDownloadURL || "", // Set a default value here
    //         date: date || "", // Set a default value here
    //     };
    //
    //     console.log(formData);
    //
    //     // Store form data in cookies or send it to Firestore as needed
    //     console.log("Form Data:", formData);
    // };

    const postContentToPage = async (PageAccessToken, pageId) => {
        // Make a request to post content on the Page's feed
        try {

            const response = await fetch(`https://graph.facebook.com/v17.0/${pageId}/photos`, {
                method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
                body: new URLSearchParams({
                    message: textValue1,
                    access_token: PageAccessToken,
                    url: textValue
                }).toString(),
            });
            const data = await response.json();
            console.log("Response from Facebook for Page ID " + pageId + ":", data);
        } catch (error) {
            console.error("Error making Facebook API request for Page ID " + pageId + ":", error);
        }
    };

    const promptGPT = async (text) => {
        // Make a request to post content on the Page's feed
        const openai = new OpenAI({
            apiKey: "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",
            dangerouslyAllowBrowser: true
        });
        const completion = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: text
        });
        console.log("completion Choices: "+completion.choices[0].text);
        console.log("completion Usage: "+completion.usage.total_tokens);
    };
    const generateImage = async (text) => {
        const apiUrl = "https://api.edenai.run/v2/image/generation";

        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzU2NGIwMGQtMTViZS00NTA5LWIxMTAtM2QyYzI5YzcxOGY3IiwidHlwZSI6ImFwaV90b2tlbiJ9.nMwjMui3DC0rI1769LX9SfOoLkv2O6MSjAMXaEf-ta8",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                show_original_response: false,
                fallback_providers: "",
                providers: "stabilityai",
                text: text,
                resolution: "512x512",
            }),
        };

        fetch(apiUrl, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTimeStamp = Timestamp.now();
        const pageId="115060235028865";
        const userAccessToken="EAAOOKKzsbjMBO9zf3FYkOH0mZA1kuSg7yFXQmh5NgwZCkgIu379YwLZC4UoZBPIBWnsbAhCiqPrHHRd2v7WtXd7IicqZBJyORFZCfb7FAK9MXxIOBtlZCn0YmF6FU0GJZAAYIsB4ZBy3ZBMwRsMSc7XeZAx133U5ENMKA3WUUJxXPSmsnMVPvTejkc3B7Yets3CO16x";
        const dataAdditionDate = new Date(currentTimeStamp.seconds * 1000);
        try{
            const pageAccessToken = await getPageAccessToken(userAccessToken, pageId);

            if (pageAccessToken) {
                //await postContentToPage(pageAccessToken, pageId);
                //await promptGPT(textValue1);
                await generateImage(textValue1);
                console.log(`Posted to Page ID ${pageId}`);
            } else {
                console.error(`Failed to obtain Page Access Token for Page ID ${pageId}`);
            }
        }
        catch (error) {
            console.error(`Error for Page ID ${pageId}:`, error);
        }
    };

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-blueGray-500 text-sm font-bold">
                                    Single Image Upload Form
                                </h6>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit}>
                                {/* File Upload */}
                                {/*<div className="relative w-full mb-3">*/}
                                {/*    <label*/}
                                {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                                {/*        htmlFor="file-upload"*/}
                                {/*    >*/}
                                {/*        Upload Image (Max 5 MB)*/}
                                {/*    </label>*/}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        id="file-upload"*/}
                                {/*        onChange={handleFileChange}*/}
                                {/*        className="hidden"*/}
                                {/*    />*/}
                                {/*    <label*/}
                                {/*        htmlFor="file-upload"*/}
                                {/*        className="cursor-pointer bg-blueGray-600 text-white active:bg-blueGray-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"*/}
                                {/*    >*/}
                                {/*        {file ? `File Selected: ${file.name}` : "Select File"}*/}
                                {/*    </label>*/}
                                {/*</div>*/}
                                {/* Text Input */}
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="text-input"
                                    >
                                        Input Image URL
                                    </label>
                                    <input
                                        type="text"
                                        id="text-input"
                                        value={textValue}
                                        onChange={handleTextChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="text-input"
                                    >
                                        Input Message
                                    </label>
                                    <input
                                        type="text"
                                        id="text-input"
                                        value={textValue1}
                                        onChange={handleTextChange1}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                                {/* Submit Button */}
                                <button
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostForm;