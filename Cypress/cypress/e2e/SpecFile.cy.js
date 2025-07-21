import LoginPage from '../PageObjects/Pages/LoginProfile';
import ProfilePage from '../PageObjects/Pages/ProfilePage';
import AdminPage from '../PageObjects/Pages/AdminPage';
import BuzzPage from '../PageObjects/Pages/BuzzPage';


describe('Automation Suite for Yaksha Application', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const adminPage = new AdminPage();
  const buzzPage = new BuzzPage();


  beforeEach(() => {

    // Visit the application URL and Login
    loginPage.performLogin();
  });

  // Test Case 1
  it('Test Case-1: Verify Image could be Uploaded as profile Pic', () => {
      cy.wrap(null).then(() => {
        // Changing Profile Picture
        profilePage.uploadProfilePicture('skyimage.jpg');
      })
      .then(() => {
        // Verify the profile picture is updated
        verifyProfilePictureUpdated();
      });

    // Logging
    cy.log('Profile picture updated successfully');

  });

  // Test Case 2
  it('Test Case-2: Verify Admin can edit record', () => {
    
      cy.wrap(null)
        .then(() => {
          // Accessing User Form Appear
          adminPage.editUserFormAppear();
      })
      .then(() => {
        // Verify the User Edit Form appears
        verifyUserEditFormAppears();
      });
    
    // Logging
    cy.log('User Edit Form appears successfully');
    });

  // Test Case 3
  it('Test Case-3: Verify Admin can sort the records', () => {
    cy.wrap(null).then(() => {
      // Navigate to Admin tab and sort by Username
      adminPage.goToAdminAndSortByUsername();

    }).then(() => {
      // Verify the sorting functionality works
      verifyUsernamesAreSortedAsc();
    });
    // Logging
    cy.log('Admin table sorting functionality verified successfully');
  });

  // Test Case 4
  it('Test Case-4: Verify Upgrade page loads correctly after clicking the button', () => {
    // verifying target and href , and it is having Active Button with Assertion.
   cy.wrap(null).then(() => {
      
      // Navigate to Admin tab and sort by Username
      adminPage.NavigateToAdminPage();

    }).then(() => {
      verifyUpgradeLinkAttributes();
      });

      cy.log('Upgrade Link Will open in new Tab.');
    });

  
  it('Test Case-5: Verify on Hover shows Help Text', () => {
    cy.wrap(null).then(() => {
      // Visit the Admin Page
      adminPage.visitAdminForTolltip();
      
    }).then(() => {
      // Verify the tooltip appears with correct title
      verifyHoverWork();
    });

    // Logging
    cy.log('Hover functionality verified successfully');
  });


  // Test Case 6
  it('Test Case-6: Verify Admin can search users by role', () => {

    cy.wrap(null).then(() => {
        // Navigate to Admin Page
        adminPage.searchAdminUsersByRole();
      })
      .then(() => {
        // Verify that only Admin users are displayed
        verifyAdminUsersDisplayed();
      });

    // Logging  
    cy.log('Admin users displayed successfully');
  });

  
  // Test Case 7
  it('Test Case-7: should upload and share a custom image with timestamped message', () => {
    const imageToUpload = 'skyimage.jpg';
    const now = new Date();
    const timestamp = `${now.getSeconds()}_${now.getMinutes()}_${now.getHours()}`;
    const postMessage = `TEST_${timestamp}`;

    cy.wrap(null)
      .then(() => {
        buzzPage.postImageWithTimestampText(imageToUpload  , postMessage); // Pass image name from here
      })
      .then(() => {
        verifyBuzzPostAppeared(postMessage); // Verifier stays same
      });


    cy.log('Buzz post with custom image and message verified');
  });


  // Test Case 8
  it('Test Case-8: Should increase like count by 1 and revert after unlike', () => {
    buzzPage.elements.buzzTab().should('be.visible').click();
    cy.wait(1000); // Wait for the page to load

    buzzPage.getFirstPost().should('be.visible').then(($post) => {
      let initialCount = 0;
      let updatedCount = 0;

      // Get initial like count , you can comment this main fucntion and the Assertion will Failed
      buzzPage.getLikeCount($post).then((count) => {
        initialCount = count;
        cy.log(`Initial Like Count: ${initialCount}`);

        // Click like .. Comment this also for failure 
        buzzPage.clickLikeButton($post);
        
        cy.wait(1000);

        // Verify +1 count
        buzzPage.getFirstLikeCount($post).then((countAfterLike) => {
          updatedCount = countAfterLike;
          verifyLikeCountIncrease(updatedCount, initialCount + 1);

          // Click again to unlike
          buzzPage.clickLikeButton($post);
          cy.wait(1000);

          // Verify Assertion is valid and revert Like Action for Future Verification
          buzzPage.getFirstLikeCount($post).then((finalCount) => {
            verifyLikeCountReverse(finalCount, initialCount);
          });

        });
      });
    });
});

  // Test Case 9
  it('Test Case-09: Should allow adding a comment to the first post', () => {

    cy.wrap(null).then(() => {

      const commentText = `Auto Comment ${Date.now()}`;
      buzzPage.addCommentToFirstPost(commentText);

    }).then(() => {
      // Verify the success toast appears
      verifyCommentSuccess();

    });
      cy.log(' Comment was successfully added to the post.');
    });


  // Test Case 10
  it('Test Case-10: Should allow editing the first Buzz post', () => {
    cy.wrap(null).then(() => {

      const editedText = `Edited post - ${Date.now()}`;
      buzzPage.editFirstPostWithText(editedText);

    }).then(() => {
      // Verify the success toast appears
      verifyPostEditSuccess();

    });
      cy.log(' Comment was successfully added to the post.');
    });


});


// ----------------------------------------- Helper Functions -----------------------------------------

// Test Case 1: Function to verify the profile picture is updated
function verifyProfilePictureUpdated() {
  cy.get('.orangehrm-edit-employee-image-wrapper img')
    .invoke('attr', 'src')
    .then((src) => {
      cy.log('Image source:', src);
      expect(src).to.include('/web/index.php/pim/viewPhoto/empNumber');
    });
}


// Test Case 2: Verify User Edit Form Appears
function verifyUserEditFormAppears() {
  cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title')
    .should('be.visible')
    .and('contain.text', 'Edit User');
}

// Test Case 3: Verify Admin Table Sorting
function verifyUsernamesAreSortedAsc() {
  cy.get('.oxd-table-cell:nth-child(2)').then(($cells) => {
    const usernames = [];

    $cells.each((index, cell) => {
      usernames.push(cell.innerText.trim());
    });

    const sorted = [...usernames].sort((a, b) => a.localeCompare(b));

    expect(usernames).to.deep.equal(sorted);
  });
}

// Test Case 4: Verify Upgrade page loads correctly after clicking the button
function verifyUpgradeLinkAttributes() {

    cy.contains('.oxd-text.oxd-text--h5.oxd-table-filter-title' , 'System Users')

    cy.get('a.orangehrm-upgrade-link')
      .should('be.visible')                                       
      .and('have.attr', 'target', '_blank')                      
      .and('have.attr', 'href')                                
      .then((href) => {
        expect(href).to.include('orangehrm.com/open-source/upgrade-to-advanced');
      }); 
  }

 // Test Case 5
function verifyHoverWork() {
  cy.contains('.oxd-text.oxd-text--h5.oxd-table-filter-title' , 'System Users')
  cy.get('button[title="Help"]')
    .should('be.visible')
    .and('have.attr', 'title', 'Help'); // Checking For HELP  Title
  }

// Test Case 6: Verify Admin can search users by role
function verifyAdminUsersDisplayed() {

  cy.wait(2000);
  cy.get('.oxd-table-cell:nth-child(3)').each(($el) => {
    cy.wait(1000);
    cy.wrap($el).invoke('text').should('contain', 'Admin');
  });
}

// Test Case 7: Verify Buzz post appears with the correct message
function verifyBuzzPostAppeared(postMessage) {

    cy.get('div.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz').first()
      .contains(postMessage);

}

// Test Case 8 : Verify like count increases by 1 and reverts after unliking
function verifyLikeCountIncrease(finalCount, expectedCount) {
  cy.log(`Updated Like Count: ${finalCount}`);
  expect(finalCount).to.equal(expectedCount);
}

function verifyLikeCountReverse(finalCount, initialCount) {
  cy.log(`Final Like Count: ${finalCount}`);
  expect(finalCount).to.equal(initialCount);
}

// Test Case 9: Verify comment functionality
function verifyCommentSuccess() {
  
      cy.get('div.oxd-toast-content--success', { timeout: 10000 })
      .should('contain.text', 'Successfully')
      .and('be.visible');
  }

function verifyPostEditSuccess() {
  cy.contains('Successfully Updated', { timeout: 10000 })
    .should('be.visible');
}


