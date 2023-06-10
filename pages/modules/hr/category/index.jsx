import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import HeadSection from '../../../../components/HeadSection';
import { del, get, post, put } from '../../../../helpers/api_helper';
import { CATEGORIE_END_POINT } from '../../../../constants/api_endpoints/categorieEndPoints';
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import Label from "../../../../components/elements/Label";
import Select from '../../../../components/elements/Select';
import TextInput from "../../../../components/elements/TextInput";
import Select2 from "../../../../components/elements/Select2";
import moment from 'moment';
import axios from 'axios';

//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);




    let myFormData = new FormData();
    myFormData.append("id", id);

    return (
        <>
            <Modal.Body>
                <Modal.Title>Are you sure to delete {id} ?</Modal.Title>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    disabled={pending}
                    onClick={() => onSubmit(id)}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </>
    );
};

const ManageCategories = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [categoryList, setCategoryList] = useState([]);
    const [pending, setPending] = useState(false);
    console.log(categoryList);

    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [category_id, setCategoryId] = useState('');
    console.log(category_id);
    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setCategoryId(id);
        // console.log(id);
    }

    // const { data: categoryList, isLoading, refetch: fetchCategoryList } = useGetAllData(QUERY_KEYS.GET_ALL_CATEGORY_LIST, CATEGORIE_END_POINT.get());
    // console.log(categoryList?.data);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            fetchCategoryList();
        });
        return () => clearTimeout(timeout);
    }, []);

    const fetchCategoryList = async () => {
        let isSubscribed = true;
        try {
            const getAllList = await get(CATEGORIE_END_POINT.get());
            console.log("category", getAllList);
            setCategoryList(getAllList);
            // setItemList(getAllList);

        } catch (error) {
            console.log("find the error");
        }

        return () => isSubscribed = false;
    }





    //Delete Subject
    const handleDelete = async (id) => {



        const deleteClass = await del(CATEGORIE_END_POINT.delete(id))
        console.log(deleteClass);
        let isSubscribed = true;

        if (deleteClass.deletedCount > 0) {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wron");
        }

        fetchCategoryList();
        return () => isSubscribed = false;





    }



    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: 'Subject Code',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status = true ? "Active" : "Inactive",
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => actionButton(row._id),
        }

    ];


    const actionButton = (id) => {
        // console.log(id);
        return <>
            <ul className="action align-items-center">

                <li>
                    <Link href={`/modules/hrm/categorie/update/${id}`}>
                        <a >
                            <EditIcon />
                        </a>
                    </Link>

                </li>

                <li>
                    <Link href={`/modules/hrm/categorie/view/${id}`}>
                        <a >
                            <ViewIcon />
                        </a>
                    </Link>

                </li>
                <li>
                    <Link href="#">
                        <a onClick={() => handleOpenDelete(id)} >
                            <DeleteIcon />
                        </a>
                    </Link>

                </li>

            </ul>
        </>
    }


    return (
        <>
            <HeadSection title="All Category-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All categories</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">
                                    <Link href="/modules/hr/category/create">
                                        <a
                                            className="shadow rounded btn btn-primary"

                                        >
                                            Add New category
                                        </a>
                                    </Link>

                                </div>
                            </div>


                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={category_id} pending={pending} />
                            </Modal>

                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={categoryList}
                                        pagination
                                        highlightOnHover
                                        subHeader

                                        subHeaderComponent={
                                            <input
                                                type="text"
                                                placeholder="search by subject code"
                                                className="w-25 form-control search-input_RESERVATIONS"
                                            //   value={search}
                                            //   onChange={(e) => setSearch(e.target.value)}
                                            />
                                        }
                                        striped
                                    />


                                </div>
                            </div>






                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageCategories