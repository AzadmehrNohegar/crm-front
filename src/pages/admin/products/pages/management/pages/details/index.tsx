import { getProductProductById } from "@/api/product";
import { Fragment } from "react";
import { Delete, Edit } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

function ProductsManagementDetails() {
  const { product_id } = useParams();

  const { data: productDetails } = useQuery(`product-${product_id}`, () =>
    getProductProductById({ id: product_id })
  );

  return (
    <Fragment>
      <div className="flex items-start gap-x-2">
        <div className="flex items-start gap-x-2">
          <img
            src={productDetails?.data.image}
            width={80}
            height={80}
            className="object-contain"
            alt="product image"
          />
          <h1 className="flex flex-col gap-y-2">
            <span>هل بنفش هندی امپراطوری اکبر</span>
            <span className="badge badge-accent">
              {productDetails?.data.category.name}
            </span>
          </h1>
        </div>
        <button className="btn btn-error btn-square ms-auto">
          <Delete />
        </button>
        <Link to="edit" className="btn btn-secondary btn-square">
          <Edit />
        </Link>
      </div>
    </Fragment>
  );
}

export default ProductsManagementDetails;
