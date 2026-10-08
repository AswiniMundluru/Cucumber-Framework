Feature: Sample Login Test

@Login
Scenario: Successful login
  Given Im on the SDET unicorn Homepage
  Then I Should see the Homepage heading "Think different. Make different."
  Then I should see the Special Sale Heading "Special Sale: Elevate Your SDET Skills! "

@TestData
Scenario Outline: Verify homepage navigation links are visible
  Given Im on the SDET unicorn Homepage
  Then I should see the home navigation links "<Linkname>"

  Examples:
    | Linkname |
    | Home |
    | About |
    | Shop |
    | Blog |
    | Contact |
    | My account |

@datatable
Scenario: Verify the homepageloads succesfully
Given Im on the SDET unicorn Homepage
Then I should see the following pricing
|Planname|
|Silver|
|Gold|
|Platinum|


@home 
Scenario: Click on Learn More
Given Im on the SDET unicorn Homepage
When click on the "Learn more" Button
Then I should go to new page "Academy Access"
Then I should comeback to the parent page 
Then I Should see the Homepage heading "Think different. Make different."







