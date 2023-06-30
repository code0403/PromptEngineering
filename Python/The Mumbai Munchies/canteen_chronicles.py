snack_inventory = {}  # Dictionary to store snack inventory (snack_id: {name, price, availability})
sales_record = {}  # Dictionary to store sales record (snack_id: quantity)

def add_snack():
    snack_id = input("Enter the ID of the snack: ")
    name = input("Enter the name of the snack: ")
    price = float(input("Enter the price of the snack: "))
    availability = input("Is the snack available? (yes/no): ").lower()
    
    snack_inventory[snack_id] = {"name": name, "price": price, "availability": availability}
    print(f"Snack with ID {snack_id} added to the inventory.")

def remove_snack():
    snack_id = input("Enter the ID of the snack to remove: ")
    if snack_id in snack_inventory:
        del snack_inventory[snack_id]
        print(f"Snack with ID {snack_id} removed from the inventory.")
    else:
        print(f"No snack with ID {snack_id} found in the inventory.")

def display_inventory():
    print("Current Snack Inventory:")
    print("{:<10} {:<20} {:<10} {:<10}".format("ID", "Name", "Price", "Availability"))
    for snack_id, details in snack_inventory.items():
        print("{:<10} {:<20} {:<10} {:<10}".format(snack_id, details["name"], details["price"], details["availability"]))

def record_sale():
    snack_id = input("Enter the ID of the snack sold: ")
    if snack_id in snack_inventory:
        quantity = int(input("Enter the quantity sold: "))
        availability = snack_inventory[snack_id]["availability"]
        if availability == "no":
            print(f"The snack {snack_inventory[snack_id]['name']} is not available.")
        elif quantity <= 0:
            print("Invalid quantity. Please enter a positive number.")
        elif quantity > 0:
            if snack_id in sales_record:
                sales_record[snack_id] += quantity
            else:
                sales_record[snack_id] = quantity
            snack_inventory[snack_id]["availability"] = "no"
            print(f"{quantity} {snack_inventory[snack_id]['name']}(s) sold.")
    else:
        print(f"No snack with ID {snack_id} found in the inventory.")



def update_availability():
    snack_id = input("Enter the ID of the snack to update availability: ")
    if snack_id in snack_inventory:
        availability = input("Is the snack available? (yes/no): ").lower()
        snack_inventory[snack_id]["availability"] = availability
        print(f"Availability of snack with ID {snack_id} updated.")
    else:
        print(f"No snack with ID {snack_id} found in the inventory.")

def display_sales_records():
    print("Sales Records:")
    print("{:<10} {:<20} {:<10}".format("ID", "Name", "Quantity Sold"))
    for snack_id, quantity in sales_record.items():
        print("{:<10} {:<20} {:<10}".format(snack_id, snack_inventory[snack_id]["name"], quantity))

def main():
    print("Welcome to the Snack Inventory Management System!")
    while True:
        print("\nPlease select an action:")
        print("1. Add Snack")
        print("2. Remove Snack")
        print("3. Display Inventory")
        print("4. Record Sale")
        print("5. Update Availability")
        print("6. Display Sales Records")
        print("7. Quit")

        choice = input("Enter your choice (1-7): ")

        if choice == "1":
            add_snack()
        elif choice == "2":
            remove_snack()
        elif choice == "3":
            display_inventory()
        elif choice == "4":
            record_sale()
        elif choice == "5":
            update_availability()
        elif choice == "6":
            display_sales_records()
        elif choice == "7":
            print("Thank you for using the Snack Inventory Management System!")
            break
        else:
            print("Invalid choice. Please enter a valid choice (1-7).")

if __name__ == "__main__":
    main()
