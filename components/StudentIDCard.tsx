import Image from "next/image";

interface StudentIDCardProps {
  profile: {
    name: string;
    email: string;
    university: string;
    studentId: string;
    avatarUrl: string;
    idCard: {
      studentId: string;
      fullName: string;
      department: string;
      dob: string;
      contact: string;
      universityLogo: string;
      qrCode: string;
    };
  };
}

const StudentIDCard: React.FC<StudentIDCardProps> = ({ profile }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={profile.avatarUrl}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full border-4 border-gray-700"
          />
          <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></span>
        </div>
        <h2 className="mt-3 text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-400 text-sm">{profile.email}</p>
        <p className="mt-2 text-gray-300">{profile.university}</p>
        <p className="text-lg font-bold">{profile.studentId}</p>
      </div>

      {/* ID Card Section */}
      <div className="mt-5 bg-gray-800 p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <Image
            src={profile.idCard.universityLogo}
            alt="University Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h3 className="text-sm font-semibold text-gray-300">
            JS Mastery University
          </h3>
        </div>

        <div className="mt-3 text-gray-300 text-sm">
          <p>
            <strong>Student ID:</strong> {profile.idCard.studentId}
          </p>
          <p>
            <strong>Full Name:</strong> {profile.idCard.fullName}
          </p>
          <p>
            <strong>Department:</strong> {profile.idCard.department}
          </p>
          <p>
            <strong>Date of Birth:</strong> {profile.idCard.dob}
          </p>
          <p>
            <strong>Contact:</strong> {profile.idCard.contact}
          </p>
        </div>

        {/* QR Code */}
        <div className="mt-3 flex justify-center">
          <Image
            src={profile.idCard.qrCode}
            alt="QR Code"
            width={60}
            height={60}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
