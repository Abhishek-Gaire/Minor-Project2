import Layout from "../components/Layout";
import { Target, Heart, Users } from "lucide-react";

const AboutPage =() =>{
  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about our mission to transform education through technology
              and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Target className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To make quality education accessible to everyone through
                innovative technology.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-600">
                Innovation, accessibility, and excellence in everything we do.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-gray-600">
                Dedicated professionals committed to revolutionizing education.
              </p>
            </div>
          </div>

          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, EduConnect emerged from a vision to bridge the
              gap between traditional education and modern technology. We
              recognized the need for a comprehensive platform that could
              facilitate seamless interaction between students and teachers
              while providing powerful tools for effective learning.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of educators and technologists worked tirelessly to
              create a platform that addresses the real needs of educational
              institutions, teachers, and students. We believe that technology
              should enhance the learning experience, not complicate it.
            </p>
            <p className="text-gray-600">
              Today, EduConnect serves thousands of users worldwide,
              continuously evolving and improving to meet the changing needs of
              modern education. Our commitment to innovation and excellence
              drives us to keep pushing the boundaries of what's possible in
              educational technology.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage;
