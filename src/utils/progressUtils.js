export const calculateProgress = (submittedCount, totalCount) => {
    if (totalCount === 0) return 0;
    return Math.round((submittedCount / totalCount) * 100);
};

export const getProgressLabel = (progress) => {
    if (progress === 0) return "Not Started";
    if (progress === 100) return "Completed";
    return "In Progress";
};

export const getAssignmentStatus = (assignment, isSubmitted) => {
    const currentTime = new Date();
    const deadline = new Date(assignment.deadline);
    const timeDiff = deadline - currentTime;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (isSubmitted) return { label: "Submitted", class: "bg-green-50 text-green-700" };
    if (timeDiff < 0) return { label: "Overdue", class: "bg-red-50 text-red-700" };
    if (hoursDiff <= 48) return { label: "Due Soon", class: "bg-amber-50 text-amber-700" };
    
    return { label: "Pending", class: "bg-slate-50 text-slate-600" };
};