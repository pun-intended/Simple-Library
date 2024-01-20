// Book Cover, Title, stage
// Border for stage color
// Drop down - select student (in class, haven't read)
// Drop down - select class - populates student list
// Confirm

const CheckOutCard = () => {
    <div className={`CheckOutCard ${book.stage}`}>
        <img className="BookDetails cover" src="" alt={`${book.title}`} />
            <h3 className="BookDetails title">{`${book.title}`}</h3>
            <label for="student-names">Choose Student</label>
                <select name="student-names" id='student-names'>
                    {/* for each name in class.students */}
                    <option value={`${student.id}`}>
                        {student.firstName} {student.lastName}</option>
                </select>
            
    </div>
}


export default CheckOutCard;