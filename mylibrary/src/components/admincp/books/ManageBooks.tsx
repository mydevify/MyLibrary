/* eslint-disable @next/next/no-img-element */
// "use client";
// import { useAuth } from '@clerk/nextjs';
// import React, { useState, useEffect } from 'react';

// type Category = {
//     id: number;
//     name: string;
// };

// type Book = {
//     title: string;
//     description: string;
//     publishedAt: string;
//     authorname: string;
//     categoryId: number;
//     userId: number;
//     downloads: number;
//     image: string;
//     size: number;
//     path: string;
// };

// const ManageBooks: React.FC = () => {
//     const [newBook, setNewBook] = useState<Omit<Book, 'userId'>>({
//         title: '',
//         description: '',
//         publishedAt: new Date().toISOString(),
//         authorname: '',
//         categoryId: 0,
//         downloads: 0,
//         image: '',
//         size: 0,
//         path: ''
//     });

//     const [categories, setCategories] = useState<Category[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [books, setBooks] = useState<Book[]>([]);
//     const [userId, setUserId] = useState<number | null>(null);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);

//     const { userId: clerkUserId } = useAuth();

//     // Fetch user ID based on Clerk user ID
//     useEffect(() => {
//         const fetchUserId = async () => {
//             if (!clerkUserId) {
//                 console.error('Clerk User ID is not available');
//                 return;
//             }

//             try {
//                 const response = await fetch(`/api/userRoles?clerkUserId=${clerkUserId}`);
//                 if (response.ok) {
//                     const user = await response.json();
//                     setUserId(user.id); // Assuming `id` is the user ID
//                 } else {
//                     console.error('Failed to fetch user ID');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user ID:', error);
//             }
//         };

//         fetchUserId();
//     }, [clerkUserId]);

//     // Fetch categories
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('/api/categories');
//                 if (response.ok) {
//                     const categories = await response.json();
//                     setCategories(categories);
//                 } else {
//                     console.error('Failed to fetch categories');
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value, type } = e.target;
//         const newValue = type === 'number' ? parseInt(value, 10) : value;

//         setNewBook(prevBook => ({
//             ...prevBook,
//             [name]: newValue
//         }));
//     };

//     const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setNewBook(prevBook => ({
//             ...prevBook,
//             [name]: value
//         }));
//     };

//     const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setNewBook(prevBook => ({
//             ...prevBook,
//             [name]: parseInt(value, 10)
//         }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0] || null;
//         setSelectedFile(file);
//     };

//     const uploadFile = async (file: File) => {
//         const formData = new FormData();
//         formData.append('file', file);

//         const response = await fetch('/api/upload', {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             const { filename } = await response.json();
//             return filename;
//         } else {
//             throw new Error('Failed to upload file');
//         }
//     };

//     const handleAddBook = async () => {
//         if (!userId) {
//             console.error('User ID is not available');
//             return;
//         }

//         setLoading(true);
//         try {
//             let imageFilename = '';

//             if (selectedFile) {
//                 imageFilename = await uploadFile(selectedFile);
//             }

//             const response = await fetch('/api/books', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...newBook, userId, image: imageFilename }),
//             });

//             if (response.ok) {
//                 const book: Book = await response.json();
//                 setBooks(prevBooks => [...prevBooks, book]);
//                 setNewBook({
//                     title: '',
//                     description: '',
//                     publishedAt: new Date().toISOString(),
//                     authorname: '',
//                     categoryId: 0,
//                     downloads: 0,
//                     image: '',
//                     size: 0,
//                     path: ''
//                 });
//                 setSelectedFile(null);
//             } else {
//                 console.error('Failed to add book');
//             }
//         } catch (error) {
//             console.error('Error adding book:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
//             <div className="space-y-4">
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Title</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={newBook.title}
//                         onChange={handleInputChange}
//                         placeholder="Enter book title"
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Description</span>
//                     </label>
//                     <textarea
//                         name="description"
//                         value={newBook.description}
//                         onChange={handleTextAreaChange}
//                         placeholder="Enter book description"
//                         className="textarea textarea-bordered w-full"
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Author Name</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="authorname"
//                         value={newBook.authorname}
//                         onChange={handleInputChange}
//                         placeholder="Enter author name"
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Category</span>
//                     </label>
//                     <select
//                         name="categoryId"
//                         value={newBook.categoryId}
//                         onChange={handleSelectChange}
//                         className="select select-bordered w-full"
//                     >
//                         <option value="">Select a category</option>
//                         {categories.map(category => (
//                             <option key={category.id} value={category.id}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Image</span>
//                     </label>
//                     <input
//                         type="file"
//                         onChange={handleFileChange}
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Size</span>
//                     </label>
//                     <input
//                         type="number"
//                         name="size"
//                         value={newBook.size}
//                         onChange={handleInputChange}
//                         placeholder="Enter size"
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">File Path</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="path"
//                         value={newBook.path}
//                         onChange={handleInputChange}
//                         placeholder="Enter file path"
//                         className="input input-bordered w-full"
//                     />
//                 </div>
//                 <button
//                     onClick={handleAddBook}
//                     className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
//                     disabled={loading}
//                 >
//                     {loading ? 'Adding...' : 'Add Book'}
//                 </button>
//             </div>
//             <div className="mt-6">
//                 <h2 className="text-xl font-semibold">Book List</h2>
//                 <ul className="list-disc pl-5 mt-2">
//                     {books.map((book, index) => (
//                         <li key={index} className="mb-2">
//                             {book.title}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default ManageBooks;





"use client";
import { useAuth } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';

type Category = {
    id: number;
    name: string;
};

type Book = {
    id: number; // Add id to handle updates
    title: string;
    description: string;
    publishedAt: string;
    authorname: string;
    categoryId: number;
    userId: number;
    downloads: number;
    image: string;
    size: number;
    path: string;
};

const ManageBooks: React.FC = () => {
    const [newBook, setNewBook] = useState<Omit<Book, 'userId' | 'id'>>({
        title: '',
        description: '',
        publishedAt: new Date().toISOString(),
        authorname: '',
        categoryId: 0,
        downloads: 0,
        image: '',
        size: 0,
        path: ''
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const { userId: clerkUserId } = useAuth();

    useEffect(() => {
        const fetchUserId = async () => {
            if (!clerkUserId) {
                console.error('Clerk User ID is not available');
                return;
            }

            try {
                const response = await fetch(`/api/userRoles?clerkUserId=${clerkUserId}`);
                if (response.ok) {
                    const user = await response.json();
                    setUserId(user.id); // Assuming `id` is the user ID
                } else {
                    console.error('Failed to fetch user ID');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, [clerkUserId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (response.ok) {
                    const categories = await response.json();
                    setCategories(categories);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books');
                if (response.ok) {
                    const books = await response.json();
                    setBooks(books);
                } else {
                    console.error('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
    
        fetchBooks();
    }, []);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseInt(value, 10) : value;

        setNewBook(prevBook => ({
            ...prevBook,
            [name]: newValue
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({
            ...prevBook,
            [name]: parseInt(value, 10)
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('filepond', file);
      
        try {
          const response = await fetch('/api/update-pdf', {
            method: 'POST',
            body: formData
          });
      
          if (response.ok) {
            const { path } = await response.json();
            return path;
          } else {
            throw new Error('Failed to upload file');
          }
        } catch (error) {
          console.error('File upload failed:', error);
          throw error;
        }
      };
      
    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const { filename } = await response.json();
            return filename;
        } else {
            throw new Error('Failed to upload file');
        }
    };


    //   const uploadImage = async (file: File): Promise<string> => {
    //     const formData = new FormData();
    //     formData.append('image', file); // Ensure the key here matches what your backend expects
    
    //     try {
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    
    //         if (!response.ok) {
    //             const errorText = await response.text();
    //             throw new Error(`Failed to upload image: ${errorText}`);
    //         }
    
    //         const { image } = await response.json();
    //         return image; // Return the image filename or URL as needed
    //     } catch (error) {
    //         setUploadError('Image upload failed.'); // Assuming `setUploadError` is a state setter for error messages
    //         console.error('Image upload error:', error);
    //         throw error; // Re-throw the error to handle it in the caller
    //     }
    // };
    
    
    // const uploadImage = async (file: File) => {
    //     const formData = new FormData();
    //     formData.append('image', file);

    //     try {
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: formData
    //         });

    //         if (response.ok) {
    //             const { image } = await response.json();
    //             return image;
    //         } else {
    //             throw new Error('Failed to upload image');
    //         }
    //     } catch (error) {
    //         setUploadError('Image upload failed.');
    //         throw error;
    //     }
    // };

    const handleAddBook = async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        setLoading(true);
        setUploadError(null); // Reset error state

        try {
            let filePath = '';
            let imagePath = '';

            if (selectedFile) {
                filePath = await uploadFile(selectedFile);
            }

            if (selectedImage) {
                imagePath = await uploadImage(selectedImage);
            }

            const response = await fetch('/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newBook, userId, path: filePath, image: imagePath }),
            });

            if (response.ok) {
                const book: Book = await response.json();
                setBooks(prevBooks => [...prevBooks, book]);
                setNewBook({
                    title: '',
                    description: '',
                    publishedAt: new Date().toISOString(),
                    authorname: '',
                    categoryId: 0,
                    downloads: 0,
                    image: '',
                    size: 0,
                    path: ''
                });
                setSelectedFile(null);
                setSelectedImage(null);
            } else {
                throw new Error('Failed to add book');
            }
        } catch (error) {
            console.error('Error adding book:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBook = async (bookId: number) => {
        setLoading(true);
        setUploadError(null); 
    
        try {
            const response = await fetch(`/api/books?id=${bookId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            setUploadError('Failed to delete book.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
            <div className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                        placeholder="Enter book title"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        name="description"
                        value={newBook.description}
                        onChange={handleTextAreaChange}
                        placeholder="Enter book description"
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Author</span>
                    </label>
                    <input
                        type="text"
                        name="authorname"
                        value={newBook.authorname}
                        onChange={handleInputChange}
                        placeholder="Enter author name"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select
                        name="categoryId"
                        value={newBook.categoryId}
                        onChange={handleSelectChange}
                        className="select select-bordered w-full"
                    >
                        <option value={0}>Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Published Date</span>
                    </label>
                    <input
                        type="date"
                        name="publishedAt"
                        value={newBook.publishedAt.split('T')[0]}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">File</span>
                    </label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div>
                {uploadError && <p className="text-red-500">{uploadError}</p>}
                <button
                    onClick={handleAddBook}
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Books List</h2>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Author</th>
                            <th>Published At</th>
                            <th>Category</th>
                            <th>Downloads</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.authorname}</td>
                                <td>{new Date(book.publishedAt).toLocaleDateString()}</td>
                                <td>{categories.find(category => category.id === book.categoryId)?.name}</td>
                                <td>{book.downloads}</td>
                                <td>
                                    <button
                                        className="btn btn-xs btn-danger"
                                        onClick={() => handleDeleteBook(book.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooks;
