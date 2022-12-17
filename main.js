$(function() {
    const $form = $('#seeForm');
    const $list = $('#seeList');
    var num = 1;
    $('#seeFormButton').on('click', function() {
        if($list.is(':visible')){
            $list.fadeOut(200, function() {
                $form.fadeIn(100);
            });
        } 
    });

    $('#seeListButton').on('click', function() {
        if($form.is(':visible')){
            $form.fadeOut(200, function() {
                $list.fadeIn(100);
            });
        } 
    });

    function Member(firstName, lastName, username, enrollDate, birthDate, id, nid) {
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.username = username; 
        this.enrollDate = enrollDate; 
        this.birthDate = birthDate; 
        this.id = num;
        this.nid = nid;
        num++;
    }

    let members=[new Member('Lucas', 'Naceri', 'lulu27', '2022-10-25', '2002-11-27', 1, 0),new Member('Test', 'User', 'test132', '2022-06-21', '2000-04-25', 2, 1),new Member('John', 'Doe', 'jdoe32', '2020-08-19', '2004-10-25', 3, 2),new Member('Nick', 'Joe', 'nicole23', '2010-02-09', '2003-03-02', 4, 3)];
    //show list of members
    function viewMembers(memberList) {
        const $memberList = $('.member-list_members');
        $memberList.html(' ');
        $(memberList).each(function(e){
            $memberList.append(`
            <div class="member" id="a${this.nid}">
            Array Index: ${this.nid}<br> ID: ${this.id}<br> Username: ${this.username}<br> Name: ${this.firstName} ${this.lastName}<br> Enroll Date: ${this.enrollDate}<br> Age: ${this.birthDate}<br>
            <input type="button" id="b${this.nid}" value="Delete ${this.firstName} ${this.lastName} with the ID of ${this.id} and the array index of ${this.nid}">
            </div>
            `)
        });
        //delete a member with array index of i
        for (let i=0; i<members.length; i++) {
            $(('#b' + i)).on('click', function() {
                let text = 'Delete '+members[i].firstName+' '+members[i].lastName+' with the ID of '+members[i].id+' and the array index of '+members[i].nid+'?';
                //confirm in order to delete a member from the list
                if (confirm(text)) {
                    members.splice(i,1);
                    console.log(members);
                    for (j=i; j<members.length+1; j++) {
                        members[j].nid -= 1;
                    }
                    
                }
            });
        }
        
    }
    
    $('members').each(function(e) {
        e.preventDefault();
    });
    //filter members by text value, function used after user releases the keyboard button
    $('#filterText').on('keyup blur', function(e) {
        let textValue = $('#filterText').val().toLowerCase();
        let filterArray = members.filter(function(member) {
            let testA = member.username.indexOf(textValue)>=0;
            let testB = member.firstName.indexOf(textValue)>=0;
            let testC = member.lastName.indexOf(textValue)>=0;
            return testA || testB || testC;
        });
        const sortBy = $('#sortBy').val().toLowerCase();
        switch(sortBy) {
            case 'firstname':
                filterArray = filterArray.sort(sortByFirstName);
                break;
            case 'lastname':
                filterArray = filterArray.sort(sortByLastName);
                break;
            case 'username':
                filterArray = filterArray.sort(sortByUsername);
                break;
            case 'enrolldate':
                filterArray = filterArray.sort(sortByEnrollDate);
                break;
            case 'birthdate':
                filterArray = filterArray.sort(sortByBirthDate);
                break;
            case 'id':
                filterArray = filterArray.sort(sortById);
                break;
            
        }
        viewMembers(filterArray);
    });
    //functions when user mouse points to filter text box
    $('#filterText').on('mouseenter', function(e) {
        let textValue = $('#filterText').val().toLowerCase();
        let filterArray = members.filter(function(member) {
            let testA = member.username.indexOf(textValue)>=0;
            let testB = member.firstName.indexOf(textValue)>=0;
            let testC = member.lastName.indexOf(textValue)>=0;
            return testA || testB || testC;
        });
        const sortBy = $('#sortBy').val().toLowerCase();
        switch(sortBy) {
            case 'firstname':
                filterArray = filterArray.sort(sortByFirstName);
                break;
            case 'lastname':
                filterArray = filterArray.sort(sortByLastName);
                break;
            case 'username':
                filterArray = filterArray.sort(sortByUsername);
                break;
            case 'enrolldate':
                filterArray = filterArray.sort(sortByEnrollDate);
                break;
            case 'birthdate':
                filterArray = filterArray.sort(sortByBirthDate);
                break;
            case 'id':
                filterArray = filterArray.sort(sortById);
                break;
            
        }
        viewMembers(filterArray);
    });
    //sumbit gym form action
    $('#gymForm').on('submit', function(e) {
        e.preventDefault();
        //store user values
        $firstName = $('#firstName');
        $lastName = $('#lastName');
        $username = $('#username');
        $enrollDate = $('#enrollDate');
        $birthDate = $('#birthDate');
        $id = $('#id');
        //check if all requirements are true
        if(validateFirstName($firstName) && validateLastName($lastName) && validateUsername($username) && validateEnrollDate($enrollDate) && validateBirthDate($birthDate)) {
            members.push(new Member($firstName.val(),$lastName.val(),$username.val(),$enrollDate.val(),$birthDate.val(),$id.val(),members.length));
            $id++;
        this.reset();
        console.log(members);
        }
    });
    $('#firstName').on('keyup blur', function() {
        let isValidFirstName = validateFirstName($(this));

        if(!isValidFirstName)
        {
            $(this).addClass("invalid");
            $('#firstNameLabel').text("First Name: (letters only)");
        } else {
            $(this).removeClass("invalid");
            $('#firstNameLabel').text("First Name:");
        }
    });
    $('#lastName').on('keyup blur', function() {
        let isValidLastName = validateLastName($(this));

        if(!isValidLastName)
        {
            $(this).addClass("invalid");
            $('#lastNameLabel').text("Last Name: (letters only)");
        } else {
            $(this).removeClass("invalid");
            $('#lastNameLabel').text("Last Name:");
        }
    });
    $('#username').on('keyup blur', function() {
        let isValidUsername = validateUsername($(this));

        if(!isValidUsername)
        {
            $(this).addClass("invalid");
            $('#usernameLabel').text("Username: (4-6 letters and 1-3 number digits)");
        } else {
            $(this).removeClass("invalid");
            $('#usernameLabel').text("Username:");
        }
    });
    $('#enrollDate').on('keyup blur', function() {
        let isValidEnrollDate = validateEnrollDate($(this));

        if(!isValidEnrollDate)
        {
            $(this).addClass("invalid");
            $('#enrollDateLabel').text("Enroll Date: (must be before current date)");
        } else {
            $(this).removeClass("invalid");
            $('#enrollDateLabel').text("Enroll Date:");
        }
    });
    $('#birthDate').on('keyup blur', function() {
        let isValidBirthDate = validateBirthDate($(this));

        if(!isValidBirthDate)
        {
            $(this).addClass("invalid");
            $('#birthDateLabel').text("Birth Date: (must be at least 18 years old)");
        } else {
            $(this).removeClass("invalid");
            $('#birthDateLabel').text("Birth Date:");
        }
    });

    //check sorting by first name
    function sortByFirstName(a, b) {
        const aName = a.firstName.toLowerCase();
        const bName = b.firstName.toLowerCase();
        if(aName > bName) {
            return 1;
        }
        else if (bName < aName) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortByLastName(a, b) {
        const aName = a.lastName.toLowerCase();
        const bName = b.lastName.toLowerCase();
        if(aName > bName) {
            return 1;
        }
        else if (bName < aName) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortByUsername(a, b) {
        const aName = a.username.toLowerCase();
        const bName = b.username.toLowerCase();
        if(aName > bName) {
            return 1;
        }
        else if (bName < aName) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortByEnrollDate(a, b) {
        const aDate = a.enrollDate.toLowerCase();
        const bDate = b.enrollDate.toLowerCase();
        if(aDate > bDate) {
            return 1;
        }
        else if (bDate < aDate) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortByBirthDate(a, b) {
        const aDate = a.birthDate.toLowerCase();
        const bDate = b.birthDate.toLowerCase();
        if(aDate > bDate) {
            return 1;
        }
        else if (bDate < aDate) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortById(a, b) {
        if(a.id > b.id) {
            return 1;
        }
        else if (b.id < a.id) {
            return -1;
        }
        else {
            return 0;
        }
    }
    //Check for the first name is only letters
    function validateFirstName($element) {
        let idExp = new RegExp('^[a-zA-z]{1,}$');
        return idExp.test($element.val());
    }
    //Check for the last name is only letters
    function validateLastName($element) {
        let idExp = new RegExp('^[a-zA-z]{1,}$');
        return idExp.test($element.val());
    }
    //Check for the username is 4-6 letters and 1-3 number digits
    function validateUsername($element) {
        let idExp = new RegExp('^[a-zA-Z]{4,6}[0-9]{1,3}$');
        return idExp.test($element.val());
    }
    //Check for the enrollment date is not future
    function validateEnrollDate($element) {
        let now = new Date;
        let userEnrollmentDate = new Date($element.val());
        return userEnrollmentDate < now;
    }
    //Check for the birth date is at least 18 years old
    function validateBirthDate($element) {
        let adultThereshold = new Date;
        adultThereshold.setFullYear(adultThereshold.getFullYear()-18);
        let userBirthDate = new Date($element.val());
        return userBirthDate < adultThereshold;
    }
});
