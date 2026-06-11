import { AnimatePresence, motion } from "framer-motion";
import type { Application } from "@/types/application.types";
import { getFullName, getInitials, formatStatus, formatDate, statusConfig } from "@/types/application.types";

interface ApplicationsTableProps {
  applications: Application[];
  totalCount: number;
  onSelect: (app: Application) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ApplicationsTable({ applications, totalCount, onSelect, onApprove, onReject }: ApplicationsTableProps) {
  return (
    <div className="rounded-2xl border border-border-light bg-white">
      {/* Table header */}
      <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        <div className="col-span-3">Doctor</div>
        <div className="col-span-2">Clinic</div>
        <div className="col-span-1">Exp.</div>
        <div className="col-span-2">License</div>
        <div className="col-span-1">Date</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-alt mb-4">
            <svg className="h-7 w-7 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0v3m0-3v-3m-6.75 9h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-text-secondary">No applications found</p>
          <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <AnimatePresence>
          {applications.map((app) => {
            const fullName = getFullName(app);
            return (
              <motion.div
                key={app._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onSelect(app)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt cursor-pointer"
              >
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                    {getInitials(app)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{fullName}</p>
                    <p className="text-[11px] text-text-muted">{app.professionalInfo.specialization}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 text-xs text-text-secondary">
                  <span className="lg:hidden text-text-muted">Clinic: </span>
                  {app.clinicInfo.clinicName}
                </div>
                <div className="lg:col-span-1 text-xs text-text-secondary">
                  <span className="lg:hidden text-text-muted">Exp: </span>
                  {app.professionalInfo.yearsOfExperience} yrs
                </div>
                <div className="lg:col-span-2 text-xs text-text-muted font-mono">
                  <span className="lg:hidden text-text-muted font-sans">License: </span>
                  {app.professionalInfo.medicalLicenseNumber}
                </div>
                <div className="lg:col-span-1 text-[11px] text-text-muted">
                  {formatDate(app.createdAt)}
                </div>
                <div className="lg:col-span-1">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusConfig[app.status]}`}>
                    {formatStatus(app.status)}
                  </span>
                </div>
                <div className="lg:col-span-2 flex items-center justify-end gap-2">
                  {app.status === "PENDING" && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); onApprove(app._id); }}
                        className="rounded-lg bg-accent-green/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent-green hover:bg-accent-green hover:text-white transition-all cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onReject(app._id); }}
                        className="rounded-lg bg-accent-red/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent-red hover:bg-accent-red hover:text-white transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelect(app); }}
                    className="rounded-lg bg-primary-50 px-2.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-xs text-text-muted">
          Showing {applications.length} of {totalCount} applications
        </p>
      </div>
    </div>
  );
}
