function DashboardLayout({ children }: any) {
    return (
        <>
            <nav className="flex justify-between items-center">
                <h3>EStore</h3>
                <div>
                    <span>{0}</span>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}

export default DashboardLayout