import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import HeadSection from '../../../../components/HeadSection';
import { USER_END_POINT } from "../../../../constants/api_endpoints/userEndPoints";
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import { del } from '../../../../helpers/api_helper';
import ToastMessage from '../../../../components/Toast';
//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);



    let myFormData = new FormData();
    myFormData.append("id", id);

    return (
        <>
            <Modal.Body>
                <Modal.Title>Are you sure to delete  ?</Modal.Title>
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



const ManageUsers = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [pending, setPending] = useState(false);
    const [user_id, setUserId] = useState('');
    const { data: userList, isLoading, refetch: fetchUserList } = useGetAllData(QUERY_KEYS.GET_ALL_USER_LIST, USER_END_POINT.get());

    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setUserId(id);
        // console.log(id);
    }




    //Delete user
    const handleDelete = async (id) => {

        let isSubscribed = true;
        // setPending(true);
        const deleteSubject = await del(USER_END_POINT.delete(id))

        if (deleteSubject.deletedCount >= 0) {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wron");
        }

        fetchUserList();
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
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
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
                    <Link href="#">
                        <a onClick={() => handleViewOpen(id)}>
                            <ViewIcon />
                        </a>
                    </Link>

                </li>

                <li>

                <Link href={`/modules/hr/users/update/${id}`}>
                        <a >
                            <EditIcon />
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
            <HeadSection title="All User-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All Users</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">
                                    <Link href="/modules/hr/users/create">
                                        <a
                                            className="shadow rounded btn btn-primary"

                                        >
                                            Add New User
                                        </a>
                                    </Link>

                                </div>
                            </div>


                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={user_id} pending={pending} />
                            </Modal>


                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={userList}
                                        pagination
                                        highlightOnHover
                                        subHeader
                                        progressPending={isLoading}
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

export default ManageUsers