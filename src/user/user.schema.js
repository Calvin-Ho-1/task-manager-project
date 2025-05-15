const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
    maxlength: [100, "firstName cannot be more than 100 characters"],
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, "lastName cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure no two users have the same email
    trim: true,
    lowercase: true, // Convert email to lowercase before saving to database
    validate: {
      validator: function (email) {
        // Regex to validate email
        /** 
         * 
         * ^\w+: This ensures that the email starts with one or more word characters (letters, digits, or underscores). The ^ anchors the match at the start of the string.

          ([\.-]?\w+)*: This matches zero or more groups that may start with a dot . or a dash -, followed by one or more word characters. This pattern matches parts of the email prefix separated by dots or dashes (like in first.last or first-last).

          @: This is the mandatory "at" symbol in the email address.

          \w+: After the @, there must be one or more word characters. This part typically matches the domain name (like example in example.com).

          ([\.-]?\w+)*: This is similar to the earlier group, allowing for domain subsections separated by dots or dashes (like example.co.uk).

          (\.\w{2,3})+$: This matches the top-level domain (TLD) which must be a dot followed by two to three word characters. It allows for emails with multiple dot-separated TLDs, like co.uk.
         */
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (password) {
        // Regular expression to validate the password
        /** 
         * Regular Expression: The regular expression ^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$ used in the validation function checks for:

        (?=.*\d): at least one digit.
        (?=.*[!@#$%^&*]): at least one special character from the set !@#$%^&*.
        (?=.*[a-z]): at least one lowercase alphabetical character.
        (?=.*[A-Z]): at least one uppercase alphabetical character.
        .{8,}: at least 8 characters of any type.
         * 
         */
        return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          password
        );
      },
      message: () =>
        "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character.",
    },
  },
});

const User = model("User", userSchema);

module.exports = User;
