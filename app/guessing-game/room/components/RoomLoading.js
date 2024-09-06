import Loading from "@/components/Loading";

import PropTypes from "prop-types";

const RoomLoading = ({ children }) => {
    return (
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="font-bold text-yellow-600 text-xl mx-3">{children}</span>
            <Loading />
        </main>
    );
};

RoomLoading.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RoomLoading;
