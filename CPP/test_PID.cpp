#include <iostream>
#include <PID.hpp>

int main() {
    PID test_pid = PID();
    std::cout << test_pid.update(1, 5) << std::endl;

    return 0;
}
